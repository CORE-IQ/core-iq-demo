import json
import os
import re
from collections import defaultdict

# Helper for color coding indexes
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    RESET = '\033[0m'

def colour_index(idx):
    colour = Colors.GREEN if idx >= 100 else Colors.RED
    return f"{colour}{idx}{Colors.RESET}"

# Load postcode data from 1.json..9.json
postcode_data = {}
for i in range(1, 10):
    fname = f"{i}.json"
    if os.path.exists(fname):
        with open(fname) as f:
            postcode_data.update(json.load(f))

# Load media index data
with open('noticed_adverts.json') as f:
    media_index_data = json.load(f)

# Load mosaic group info
with open('primary_content.json') as f:
    groups_raw = json.load(f)

group_names = {
    g['group_code']: g['group_name']
    for g in groups_raw
    if g.get('group_code') and g['group_code'].strip() and isinstance(g.get('group_name'), str)
}

def standard_group_label(code):
    name = group_names.get(code, 'Unknown')
    return f"{code} - {name} (15+)"

# Parse group code from 'type' string like "A04 Metro High-Flyers (15+)" or "B Prestige Positions (15+)"
GROUP_RE = re.compile(r'^([A-Z])')

def parse_group_code(text):
    m = GROUP_RE.match(text)
    return m.group(1) if m else None


def collect_counts(postcode_subset):
    totals = defaultdict(lambda: defaultdict(int))  # {group_label: {postcode: count}}
    for pc, entries in postcode_subset.items():
        for item in entries:
            code = parse_group_code(item['type'])
            if not code:
                continue
            group_label = standard_group_label(code)
            totals[group_label][pc] += item['count']
    return totals

# Input
user_query = input('Enter postcode or search term: ').strip()
total_budget = float(input('Enter total budget: '))

# Determine if query is postcode
matched_postcodes = {k:v for k,v in postcode_data.items() if user_query.upper() in k.upper()}
search_type = 'postcode' if matched_postcodes else 'attribute'

if search_type == 'postcode':
    subset = matched_postcodes
else:
    # if attribute search, consider all postcodes
    subset = postcode_data

totals = collect_counts(subset)

# Build plan
output = {}
for group, pcs in totals.items():
    total_group_count = sum(pcs.values())
    if total_group_count == 0:
        continue
    output[group] = {
        'total': total_group_count,
        'postcodes': {},
        'media': {}
    }

    # get media indices for group
    media_items = media_index_data.get(group, [])
    over100 = [m for m in media_items if m['index'] >= 100]
    total_index = sum(m['index'] for m in over100) or 1

    for item in media_items:
        output[group]['media'][item['channel']] = {
            'index': colour_index(item['index']),
            'spend': 0
        }

    for pc, count in pcs.items():
        if count < 1000:
            continue
        output[group]['postcodes'][pc] = {'count': count, 'media_allocation': {}}
        for m in over100:
            spend = (count / total_group_count) * (m['index'] / total_index) * total_budget
            output[group]['media'][m['channel']]['spend'] += spend
            output[group]['postcodes'][pc]['media_allocation'][m['channel']] = spend

# Reporting
print('\n--- RATIONALE ---')
print(f"Query matched via: {user_query} ({search_type})")
print('Only postcodes with >1000 count were included in spend model')
print(f"Budget of £{total_budget:,.2f} allocated to channels with index > 100\n")

print('--- MEDIA PLAN OUTPUT ---')
for group, data in output.items():
    print(f"\nMosaic Group: {group} (Total Count: {data['total']})")
    print('  MEDIA INDEX:')
    for ch, val in data['media'].items():
        print(f"    {ch}: {val['index']} | Spend: £{val['spend']:.2f}")
    if data['postcodes']:
        print('  POSTCODE DISTRIBUTION:')
        for pc, info in data['postcodes'].items():
            print(f"    {pc} ({info['count']} people)")
            for ch, s in info['media_allocation'].items():
                print(f"      {ch}: £{s:.2f}")
