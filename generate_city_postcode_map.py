import json
import glob
import os


def build_mapping():
    mapping = {}
    for fname in glob.glob('*_postcodes.json'):
        city = fname[:-len('_postcodes.json')]
        city_key = city.replace('_', ' ').upper()
        with open(fname) as f:
            data = json.load(f)
        prefixes = list(data.keys())
        mapping[city_key] = prefixes
    london_prefixes = set()
    for key, prefixes in mapping.items():
        if 'LONDON' in key:
            london_prefixes.update(prefixes)
    if london_prefixes:
        mapping['LONDON'] = sorted(london_prefixes)
    return mapping


def main():
    mapping = build_mapping()
    with open('city_to_postcodes.json', 'w') as f:
        json.dump(mapping, f, indent=2)
    print(f'Wrote {len(mapping)} cities to city_to_postcodes.json')


if __name__ == '__main__':
    main()
