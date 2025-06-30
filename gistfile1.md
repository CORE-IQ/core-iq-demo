# YouGov API

## Searching

### Request

**Headers:**
Accept:	    application/json, text/plain, */*
Referer:	https://yougov.co.uk/profiler

**URL Format:** https://yougov.co.uk/profileslite/search/profiles_json/[text]

**URL Example:** https://yougov.co.uk/profileslite/search/profiles_json/gua

### Response

    [{
        "id": "bae245ad-a904-11e1-9412-005056900141",
        "thing_name": "The Guardian",
        "thing_label": "The Guardian",
        "thing_uuid": "bae245ad-a904-11e1-9412-005056900141",
        "thing_type": "Newspaper",
        "thing_url": "The_Guardian",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/162\/thumbnail_16135.jpg?h=160"
    }, {
        "id": "bffeddcb-a904-11e1-9412-005056900141",
        "thing_name": "Guacamole",
        "thing_label": "Guacamole",
        "thing_uuid": "bffeddcb-a904-11e1-9412-005056900141",
        "thing_type": "Dish",
        "thing_url": "Guacamole",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/1635\/thumbnail_163446.jpg?h=160"
    }, {
        "id": "bdf85f62-a904-11e1-9412-005056900141",
        "thing_name": "The Guardian",
        "thing_label": "The Guardian",
        "thing_uuid": "bdf85f62-a904-11e1-9412-005056900141",
        "thing_type": "Website",
        "thing_url": "The_Guardian_(Website)",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/998\/thumbnail_99736.png?h=160"
    }, {
        "id": "c08a2dbe-a904-11e1-9412-005056900141",
        "thing_name": "Guava",
        "thing_label": "Guava",
        "thing_uuid": "c08a2dbe-a904-11e1-9412-005056900141",
        "thing_type": "Fruit",
        "thing_url": "Guava",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/1850\/thumbnail_184936.jpg?h=160"
    }, {
        "id": "6a566fa0-195d-11e4-9a9a-005056900141",
        "thing_name": "Guardians of the Galaxy",
        "thing_label": "Guardians of the Galaxy",
        "thing_uuid": "6a566fa0-195d-11e4-9a9a-005056900141",
        "thing_type": "Movie",
        "thing_url": "Guardians_of_the_Galaxy",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/20140801\/b9c5f0000e345586b3657062f654903a.jpg?h=160"
    }, {
        "id": "ba9277f3-a904-11e1-9412-005056900141",
        "thing_name": "Guards! Guards!",
        "thing_label": "Guards! Guards!",
        "thing_uuid": "ba9277f3-a904-11e1-9412-005056900141",
        "thing_type": "Fiction Book",
        "thing_url": "Guards_Guards",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/96\/thumbnail_9502.jpg?h=160"
    }, {
        "id": "bb0b0379-a904-11e1-9412-005056900141",
        "thing_name": "The Guardian Weekly",
        "thing_label": "The Guardian Weekly",
        "thing_uuid": "bb0b0379-a904-11e1-9412-005056900141",
        "thing_type": "Magazine",
        "thing_url": "Guardian_Weekly",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/20140317\/cd1021154e19023b64b8fd062f180ca8.jpg?h=160"
    }, {
        "id": "bb3101fc-a904-11e1-9412-005056900141",
        "thing_name": "The Guardian Mobile",
        "thing_label": "The Guardian Mobile",
        "thing_uuid": "bb3101fc-a904-11e1-9412-005056900141",
        "thing_type": "Mobile Application",
        "thing_url": "The_Guardian_Mobile",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/thumbnail_24396.jpg?h=160"
    }, {
        "id": "bdd59509-a904-11e1-9412-005056900141",
        "thing_name": "Charlie Brooker's blog with The Guardian",
        "thing_label": "Charlie Brooker's blog with The Guardian",
        "thing_uuid": "bdd59509-a904-11e1-9412-005056900141",
        "thing_type": "Website",
        "thing_url": "Charlie_Brookers_blog_with_The_Guardian",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/953\/thumbnail_95225.png?h=160"
    }, {
        "id": "bad06b64-a904-11e1-9412-005056900141",
        "thing_name": "Guatemala",
        "thing_label": "Guatemala",
        "thing_uuid": "bad06b64-a904-11e1-9412-005056900141",
        "thing_type": "World Place",
        "thing_url": "Guatemala",
        "thumbnail": "https:\/\/d3pdz4xx1kmjm6.cloudfront.net\/images\/thumbnails\/20131127\/0294a07051a55842d8e049affe9ab852.jpg?h=160"
    }
    ]

---

## Querying 

### Request

**Headers:**
Accept:	    application/json, text/plain, */*
Referer:	https://yougov.co.uk/profiler

**URL:** https://yougov.co.uk/opi/search/profiles_json_by_url/Daily_Mail

### Response
    [
        {
            "id": "b9ce64a1-a904-11e1-9412-005056900141",
            "thing_label": "Daily Mail",
            "thing_name": "Daily Mail",
            "thing_type": "Newspaper",
            "thing_url": "Daily_Mail",
            "thing_uuid": "b9ce64a1-a904-11e1-9412-005056900141",
            "thumbnail": "https://d3pdz4xx1kmjm6.cloudfront.net/images/thumbnails/10/thumbnail_936.jpg?h=160"
        }
    ]

---

## Fetch Details

### Request

**Headers:**
Accept:	    application/json, text/plain, */*
Referer:	https://yougov.co.uk/profiler

**URL:** https://o-images.yougov.co.uk/json/bb323a61-a904-11e1-9412-005056900141

### Response

    {
      "status" : 200,
      "search" : {
        "label" : "Daily Mail",
        "title" : "Customers of Daily Mail",
        "subject_size" : 10712,
        "date_time" : "2014-11-08T22:32:57.107Z"
      },
      "data" : {
        "demographics" : {
          "age" : [ {
            "label" : "60+",
            "zscore" : 16.997354010580512
          }, {
            "label" : "18-24",
            "zscore" : -4.7033831593151785
          }, {
            "label" : "40-59",
            "zscore" : -4.774222039477774
          }, {
            "label" : "25-39",
            "zscore" : -14.530506307819952
          } ],
          "gender" : [ {
            "label" : "Female",
            "zscore" : 2.9438283971901664
          }, {
            "label" : "Male",
            "zscore" : -2.9438283971901664
          } ],
          "social_grad" : [ {
            "label" : "ABC1",
            "zscore" : 5.643471149713758
          }, {
            "label" : "C2DE",
            "zscore" : -5.625535443590444
          } ],
          "region" : [ {
            "label" : "South Coast",
            "zscore" : 3.0013165209294277
          }, {
            "label" : "East Anglia",
            "zscore" : 2.976988420385912
          }, {
            "label" : "London",
            "zscore" : 2.189461476818682
          }, {
            "label" : "North West",
            "zscore" : 1.3787604805380402
          }, {
            "label" : "Midlands",
            "zscore" : 0.26647622549111066
          }, {
            "label" : "North East",
            "zscore" : 0.05318544164627739
          }, {
            "label" : "West Country",
            "zscore" : -0.3854976797066577
          }, {
            "label" : "The Borders",
            "zscore" : -0.45501161052266476
          }, {
            "label" : "Wales",
            "zscore" : -1.7849931125657665
          }, {
            "label" : "Yorkshire",
            "zscore" : -2.3501799620664268
          }, {
            "label" : "Northern Scotland",
            "zscore" : -3.8106071621179654
          }, {
            "label" : "Central Scotland",
            "zscore" : -5.197565704571568
          } ],
          "income" : [ {
            "label" : "£1000 or more",
            "zscore" : 1.8130500291310945
          }, {
            "label" : "£500 to £999",
            "zscore" : 1.7260503338267534
          }, {
            "label" : "£125 to £499",
            "zscore" : 0.7880242305502235
          }, {
            "label" : "Less than £125",
            "zscore" : -7.562465057104066
          } ],
          "professional_interests" : [ {
            "label" : "Advertising/Marketing/Public Relations",
            "zscore" : 3.260940866572801,
            "entity" : "bb74c1a4-a904-11e1-9412-005056900141"
          }, {
            "label" : "Travel and Hospitality",
            "zscore" : 2.2695239685196182,
            "entity" : "bb749acd-a904-11e1-9412-005056900141"
          }, {
            "label" : "Healthcare and Medicine",
            "zscore" : 2.248094246473806,
            "entity" : "bb6d47a7-a904-11e1-9412-005056900141"
          }, {
            "label" : "Finance",
            "zscore" : 2.1848766055319366,
            "entity" : "bb6d6ebe-a904-11e1-9412-005056900141"
          }, {
            "label" : "Business",
            "zscore" : 1.5531729666515188,
            "entity" : "bb6d6ebc-a904-11e1-9412-005056900141"
          }, {
            "label" : "Media and Publishing",
            "zscore" : 1.0702255335964876,
            "entity" : "bb74c1a3-a904-11e1-9412-005056900141"
          }, {
            "label" : "Police and Emergency Services",
            "zscore" : 1.003251183420346,
            "entity" : "bb74c1ac-a904-11e1-9412-005056900141"
          }, {
            "label" : "Consumer Goods",
            "zscore" : 0.8981730947636702,
            "entity" : "bb74c1a0-a904-11e1-9412-005056900141"
          }, {
            "label" : "Accounting",
            "zscore" : 0.881248570889723,
            "entity" : "bb73d74c-a904-11e1-9412-005056900141"
          }, {
            "label" : "Insurance",
            "zscore" : 0.7105767402481374,
            "entity" : "bb73d776-a904-11e1-9412-005056900141"
          } ]
        },
        "lifestyle" : {
          "hobbies" : [ {
            "label" : "Reading",
            "zscore" : 7.123279452997273,
            "entity" : "bb797cb8-a904-11e1-9412-005056900141"
          }, {
            "label" : "Gardening",
            "zscore" : 6.99554283552258,
            "entity" : "bb797cb4-a904-11e1-9412-005056900141"
          }, {
            "label" : "DIY",
            "zscore" : 2.8931544561103477,
            "entity" : "bb797cb2-a904-11e1-9412-005056900141"
          }, {
            "label" : "Exercising",
            "zscore" : 1.9736021126540755,
            "entity" : "bb905ffd-a904-11e1-9412-005056900141"
          }, {
            "label" : "People Watching",
            "zscore" : 1.7039791229378431,
            "entity" : "1fdcbef0-1aff-11e3-9ae2-005056900141"
          }, {
            "label" : "Collecting",
            "zscore" : 1.668738395486433,
            "entity" : "bb797cb6-a904-11e1-9412-005056900141"
          }, {
            "label" : "Going on day trips",
            "zscore" : 1.4665209234586314,
            "entity" : "bb797cc5-a904-11e1-9412-005056900141"
          }, {
            "label" : "Genealogy",
            "zscore" : 1.4539448872876195,
            "entity" : "bbb414a2-a904-11e1-9412-005056900141"
          }, {
            "label" : "Caravanning",
            "zscore" : 1.0522335826337708,
            "entity" : "bc51b434-a904-11e1-9412-005056900141"
          }, {
            "label" : "Watching TV",
            "zscore" : 1.0236767280367198,
            "entity" : "ba7be2b8-a904-11e1-9412-005056900141"
          } ],
          "sports" : [ {
            "label" : "Golf",
            "zscore" : 2.565748454143999,
            "entity" : "bb6cd270-a904-11e1-9412-005056900141"
          }, {
            "label" : "Tennis",
            "zscore" : 2.139975831500832,
            "entity" : "bb6cd275-a904-11e1-9412-005056900141"
          }, {
            "label" : "Horse Racing",
            "zscore" : 1.9077111066666037,
            "entity" : "bb6cd271-a904-11e1-9412-005056900141"
          }, {
            "label" : "Bowls",
            "zscore" : 1.3307835743458232,
            "entity" : "bd04143c-a904-11e1-9412-005056900141"
          }, {
            "label" : "Judo",
            "zscore" : 1.3095670163538644,
            "entity" : "bb6d2087-a904-11e1-9412-005056900141"
          }, {
            "label" : "Athletics - 100 metres",
            "zscore" : 1.2620161361171127,
            "entity" : "bb6d208c-a904-11e1-9412-005056900141"
          }, {
            "label" : "Badminton",
            "zscore" : 1.2379584607236174,
            "entity" : "bb6d208b-a904-11e1-9412-005056900141"
          }, {
            "label" : "Sports car racing",
            "zscore" : 1.1298453428945119,
            "entity" : "bb6d6eb2-a904-11e1-9412-005056900141"
          }, {
            "label" : "Touring car racing",
            "zscore" : 1.0844898171128925,
            "entity" : "bb6d6eb1-a904-11e1-9412-005056900141"
          }, {
            "label" : "Long jump",
            "zscore" : 1.0517580876121209,
            "entity" : "bb6d2098-a904-11e1-9412-005056900141"
          } ],
          "pets" : [ {
            "label" : "Dog",
            "zscore" : 0.3304982800348464
          }, {
            "label" : "Bird",
            "zscore" : 0.0007244806833789936
          }, {
            "label" : "Fish",
            "zscore" : -1.2766804484653895
          }, {
            "label" : "Cat",
            "zscore" : -1.29295389212992
          } ],
          "dishes" : [ {
            "label" : "Cheese and Tomato Sandwich",
            "zscore" : 2.4691355992537676,
            "entity" : "c146c70d-a904-11e1-9412-005056900141"
          }, {
            "label" : "Lobster",
            "zscore" : 2.3693505959137378,
            "entity" : "c027c278-a904-11e1-9412-005056900141"
          }, {
            "label" : "Sweet And Sour Prawns",
            "zscore" : 2.252454112568065,
            "entity" : "c06e6859-a904-11e1-9412-005056900141"
          }, {
            "label" : "Coronation Chicken",
            "zscore" : 2.238252614830215,
            "entity" : "bff60411-a904-11e1-9412-005056900141"
          }, {
            "label" : "Neapolitan Ice Cream",
            "zscore" : 2.1898654785680107,
            "entity" : "bffe1a68-a904-11e1-9412-005056900141"
          }, {
            "label" : "Broccolli And Stilton Soup",
            "zscore" : 2.1728633879798447,
            "entity" : "c11c34bc-a904-11e1-9412-005056900141"
          }, {
            "label" : "Coffee and Walnut Cake",
            "zscore" : 2.0189311809350623,
            "entity" : "beb87af0-a904-11e1-9412-005056900141"
          }, {
            "label" : "Herb Dumplings",
            "zscore" : 1.9797048087412996,
            "entity" : "c051b8ad-a904-11e1-9412-005056900141"
          }, {
            "label" : "Egg Mayonnaise Sandwich",
            "zscore" : 1.945122183761844,
            "entity" : "c146ee1f-a904-11e1-9412-005056900141"
          }, {
            "label" : "Apple Pie",
            "zscore" : 1.8669107581239472,
            "entity" : "bfc445cd-a904-11e1-9412-005056900141"
          } ],
          "general_interests" : [ {
            "label" : "Newspapers and Magazines",
            "zscore" : 10.275171768976781,
            "entity" : "bae245a5-a904-11e1-9412-005056900141"
          }, {
            "label" : "Personal Finance",
            "zscore" : 4.447208178684129,
            "entity" : "bb6d47a8-a904-11e1-9412-005056900141"
          }, {
            "label" : "People and Celebrities",
            "zscore" : 4.436411271425135,
            "entity" : "bac3c122-a904-11e1-9412-005056900141"
          }, {
            "label" : "Business and Finance",
            "zscore" : 4.06086683337028,
            "entity" : "b9bfe5b1-a904-11e1-9412-005056900141"
          }, {
            "label" : "Websites",
            "zscore" : 2.779090941775442,
            "entity" : "bae293d2-a904-11e1-9412-005056900141"
          }, {
            "label" : "UK News",
            "zscore" : 2.7498630178711223,
            "entity" : "bb6cd264-a904-11e1-9412-005056900141"
          }, {
            "label" : "Beauty & Grooming",
            "zscore" : 2.6352168733743566,
            "entity" : "bb6d47a6-a904-11e1-9412-005056900141"
          }, {
            "label" : "International News",
            "zscore" : 1.9995959775627234,
            "entity" : "bae293cc-a904-11e1-9412-005056900141"
          }, {
            "label" : "Politics",
            "zscore" : 1.6402448066350808,
            "entity" : "bae293cb-a904-11e1-9412-005056900141"
          }, {
            "label" : "Travel and Holidays",
            "zscore" : 1.5967887294293794,
            "entity" : "b9bfe5b2-a904-11e1-9412-005056900141"
          } ],
          "niche_interests" : [ {
            "label" : "Gardening",
            "zscore" : 3.49711544545094,
            "entity" : "bb797cb4-a904-11e1-9412-005056900141"
          }, {
            "label" : "Property",
            "zscore" : 3.338482503228852,
            "entity" : "bae26cbf-a904-11e1-9412-005056900141"
          }, {
            "label" : "Letters to the Editor",
            "zscore" : 3.2574127157647954,
            "entity" : "bae26cc4-a904-11e1-9412-005056900141"
          }, {
            "label" : "Golf",
            "zscore" : 2.8710582342630624,
            "entity" : "bb6cd270-a904-11e1-9412-005056900141"
          }, {
            "label" : "Editorials & Comment",
            "zscore" : 2.761974684513288,
            "entity" : "bae26cc3-a904-11e1-9412-005056900141"
          }, {
            "label" : "Southern Italy",
            "zscore" : 2.722454726076991,
            "entity" : "ebbfeed0-812a-11e2-ad3b-005056900141"
          }, {
            "label" : "The British Monarchy",
            "zscore" : 2.5745819675841406,
            "entity" : "bb9f541e-a904-11e1-9412-005056900141"
          }, {
            "label" : "Shopping",
            "zscore" : 2.549718039343206,
            "entity" : "bb906009-a904-11e1-9412-005056900141"
          }, {
            "label" : "Public Relations",
            "zscore" : 2.4620905430908815,
            "entity" : "bb73fe6f-a904-11e1-9412-005056900141"
          }, {
            "label" : "Tennis",
            "zscore" : 2.420033605963752,
            "entity" : "bb6cd275-a904-11e1-9412-005056900141"
          } ]
        },
        "personality" : {
          "positive_traits" : [ {
            "label" : "Conscientious",
            "zscore" : 1.7106403761743667,
            "entity" : "bbc9bf7f-a904-11e1-9412-005056900141"
          }, {
            "label" : "Well-balanced",
            "zscore" : 1.7039046180536197,
            "entity" : "bb8feaf5-a904-11e1-9412-005056900141"
          }, {
            "label" : "Sympathetic",
            "zscore" : 1.6728531233094115,
            "entity" : "bb9038ec-a904-11e1-9412-005056900141"
          }, {
            "label" : "Certain",
            "zscore" : 1.6225246616837956,
            "entity" : "bb8fead3-a904-11e1-9412-005056900141"
          }, {
            "label" : "A leader",
            "zscore" : 1.5806824122202927,
            "entity" : "bb9edeec-a904-11e1-9412-005056900141"
          }, {
            "label" : "Competent",
            "zscore" : 1.4461635921094833,
            "entity" : "bb8fead5-a904-11e1-9412-005056900141"
          }, {
            "label" : "Strong",
            "zscore" : 1.4011457733780872,
            "entity" : "bb8feaf1-a904-11e1-9412-005056900141"
          }, {
            "label" : "Agreeable",
            "zscore" : 1.3861950577474036,
            "entity" : "6408a090-7432-11e2-ad3b-005056900141"
          }, {
            "label" : "Affable",
            "zscore" : 1.384938138083728,
            "entity" : "ba8643a0-9ed9-11e3-94cc-005056900141"
          }, {
            "label" : "Inquisitive",
            "zscore" : 1.3222331137580694,
            "entity" : "bc51db49-a904-11e1-9412-005056900141"
          } ],
          "negative_traits" : [ {
            "label" : "Intolerant",
            "zscore" : 2.5153218732088556,
            "entity" : "bc5c1478-a904-11e1-9412-005056900141"
          }, {
            "label" : "Impatient",
            "zscore" : 1.8457195844657002,
            "entity" : "bb9edef2-a904-11e1-9412-005056900141"
          }, {
            "label" : "Proud",
            "zscore" : 1.8378560059014704,
            "entity" : "c3310ac9-a904-11e1-9412-005056900141"
          }, {
            "label" : "Bossy",
            "zscore" : 1.820687005909135,
            "entity" : "bbbd6369-a904-11e1-9412-005056900141"
          }, {
            "label" : "Easily distracted",
            "zscore" : 1.4989417897649666,
            "entity" : "7d0fddc0-012f-11e4-806f-005056900141"
          }, {
            "label" : "Arrogant",
            "zscore" : 1.3717554028187091,
            "entity" : "bb8fc3dc-a904-11e1-9412-005056900141"
          }, {
            "label" : "Untidy",
            "zscore" : 1.2406889201640743,
            "entity" : "bca6b1fc-a904-11e1-9412-005056900141"
          }, {
            "label" : "Cantankerous",
            "zscore" : 1.2001616484768147,
            "entity" : "02fb7810-f536-11e2-bc11-005056900141"
          }, {
            "label" : "Uptight",
            "zscore" : 1.140476733423484,
            "entity" : "c2061f6d-a904-11e1-9412-005056900141"
          }, {
            "label" : "Judgemental",
            "zscore" : 1.1314330628566283,
            "entity" : "be54fe63-a904-11e1-9412-005056900141"
          } ],
          "attitudes" : [ {
            "label" : "UKIP are just saying what ordinary British people are thinking",
            "zscore" : 8.948931056240795,
            "entity" : "3f564ec0-f634-11e3-b279-005056900127"
          }, {
            "label" : "I look for profitable ways to invest money",
            "zscore" : 5.480788215501903,
            "entity" : "ecfc5dd0-d532-11e3-8434-005056900127"
          }, {
            "label" : "I manage my finances well",
            "zscore" : 5.426876599937313,
            "entity" : "909921d0-d533-11e3-8434-005056900127"
          }, {
            "label" : "This country is going to the dogs",
            "zscore" : 5.04842496247346,
            "entity" : "331d8240-f7b5-11e3-b279-005056900127"
          }, {
            "label" : "I find the idea of being in debt stressful",
            "zscore" : 4.809606260286768,
            "entity" : "818b8660-d533-11e3-8434-005056900127"
          }, {
            "label" : "I'm good at saving up for stuff that I want",
            "zscore" : 4.4508761846165195,
            "entity" : "988d6ae0-d533-11e3-8434-005056900127"
          }, {
            "label" : "I enjoy having a wide range of products and services",
            "zscore" : 4.355936426801679,
            "entity" : "ce4b88a0-d1fb-11e3-8434-005056900127"
          }, {
            "label" : "Being insured for everything is important",
            "zscore" : 3.5319623016437425,
            "entity" : "1048c620-d533-11e3-8434-005056900127"
          }, {
            "label" : "I use beauty products to make myself feel better",
            "zscore" : 3.29781386204599,
            "entity" : "b68b8430-d530-11e3-8434-005056900127"
          }, {
            "label" : "I use beauty products to make myself look better",
            "zscore" : 3.264391907679894,
            "entity" : "be695f10-d530-11e3-8434-005056900127"
          } ]
        },
        "brands" : {
          "customer_of" : [ {
            "label" : "Marks & Spencer",
            "zscore" : 7.013444181133895
          }, {
            "label" : "Marks & Spencer",
            "zscore" : 6.230123004692853
          }, {
            "label" : "EuroMillions",
            "zscore" : 5.746813977260906
          }, {
            "label" : "NS&I Premium Bonds",
            "zscore" : 5.7369794245804915
          }, {
            "label" : "Cathedral City",
            "zscore" : 5.452327363159314
          }, {
            "label" : "Lotto",
            "zscore" : 5.425975588686155
          }, {
            "label" : "Lidl",
            "zscore" : 5.395695061892427
          }, {
            "label" : "MoneySavingExpert.com",
            "zscore" : 5.392169605861652
          }, {
            "label" : "Marks & Spencer",
            "zscore" : 5.388395675421393
          }, {
            "label" : "Boots",
            "zscore" : 5.057304593430364
          } ],
          "wear" : [ {
            "label" : "John Lewis",
            "zscore" : 1.9014326337621694,
            "entity" : "c27eaadb-a904-11e1-9412-005056900141"
          }, {
            "label" : "Marks & Spencer",
            "zscore" : 1.577053744056837,
            "entity" : "bfbea06a-a904-11e1-9412-005056900141"
          }, {
            "label" : "Russell & Bromley",
            "zscore" : 1.5463214978611801,
            "entity" : "c27fe340-a904-11e1-9412-005056900141"
          }, {
            "label" : "Fenwick",
            "zscore" : 1.5451055186623157,
            "entity" : "c27eaab3-a904-11e1-9412-005056900141"
          }, {
            "label" : "Ralph Lauren",
            "zscore" : 1.5423911519028692,
            "entity" : "c27fe33a-a904-11e1-9412-005056900141"
          }, {
            "label" : "Gant",
            "zscore" : 1.4426744586600833,
            "entity" : "c27eaabe-a904-11e1-9412-005056900141"
          }, {
            "label" : "Monsoon",
            "zscore" : 1.4189328843144549,
            "entity" : "c27ed1df-a904-11e1-9412-005056900141"
          }, {
            "label" : "O'Neill",
            "zscore" : 1.2834629047777872,
            "entity" : "c28c6663-a904-11e1-9412-005056900141"
          }, {
            "label" : "Cotton Traders",
            "zscore" : 1.282670796556344,
            "entity" : "c29f2b31-a904-11e1-9412-005056900141"
          }, {
            "label" : "Matthew Williamson",
            "zscore" : 1.268188253131766,
            "entity" : "c27ed1d8-a904-11e1-9412-005056900141"
          } ],
          "bank" : [ {
            "label" : "NatWest",
            "zscore" : 1.5614334659119882,
            "entity" : "c284ec61-a904-11e1-9412-005056900141"
          }, {
            "label" : "Barclays",
            "zscore" : 1.3614733805465744,
            "entity" : "c284ec57-a904-11e1-9412-005056900141"
          }, {
            "label" : "Santander",
            "zscore" : 1.3237182734696382,
            "entity" : "c284ec66-a904-11e1-9412-005056900141"
          }, {
            "label" : "Nationwide Building Society",
            "zscore" : 1.1866781166096392,
            "entity" : "c284ec48-a904-11e1-9412-005056900141"
          }, {
            "label" : "First Direct",
            "zscore" : 0.9896412961223379,
            "entity" : "c2aebb85-a904-11e1-9412-005056900141"
          }, {
            "label" : "Lloyds Bank",
            "zscore" : 0.9355111064570368,
            "entity" : "c284ec5f-a904-11e1-9412-005056900141"
          }, {
            "label" : "Coventry Building Society",
            "zscore" : 0.7030452189291819,
            "entity" : "c284ec47-a904-11e1-9412-005056900141"
          }, {
            "label" : "Sainsbury's",
            "zscore" : 0.656906255170121,
            "entity" : "bfaf5e20-a904-11e1-9412-005056900141"
          }, {
            "label" : "Cahoot",
            "zscore" : 0.6540551476822728,
            "entity" : "b541d550-b70b-11e2-8cac-005056900141"
          }, {
            "label" : "HSBC",
            "zscore" : 0.4350531838145303,
            "entity" : "c284ec54-a904-11e1-9412-005056900141"
          } ],
          "car" : [ {
            "label" : "Mercedes-Benz",
            "zscore" : 1.9428151480020117,
            "entity" : "ba20a35b-a904-11e1-9412-005056900141"
          }, {
            "label" : "BMW",
            "zscore" : 1.5618525318706582,
            "entity" : "ba0468c1-a904-11e1-9412-005056900141"
          }, {
            "label" : "Jaguar",
            "zscore" : 1.5535468318353163,
            "entity" : "ba1ea78b-a904-11e1-9412-005056900141"
          }, {
            "label" : "Honda",
            "zscore" : 1.4733906993181358,
            "entity" : "ba1e0b46-a904-11e1-9412-005056900141"
          }, {
            "label" : "Nissan",
            "zscore" : 1.1692453233947557,
            "entity" : "ba2229f0-a904-11e1-9412-005056900141"
          }, {
            "label" : "Lexus",
            "zscore" : 0.8996876693493908,
            "entity" : "ba1fb8f5-a904-11e1-9412-005056900141"
          }, {
            "label" : "Chevrolet",
            "zscore" : 0.8151479813227022,
            "entity" : "ba052c15-a904-11e1-9412-005056900141"
          }, {
            "label" : "Saab",
            "zscore" : 0.7783336386722233,
            "entity" : "ba244cd7-a904-11e1-9412-005056900141"
          }, {
            "label" : "Daihatsu",
            "zscore" : 0.715471431791438,
            "entity" : "ba066490-a904-11e1-9412-005056900141"
          }, {
            "label" : "Hyundai",
            "zscore" : 0.7085837971376997,
            "entity" : "ba1e5964-a904-11e1-9412-005056900141"
          } ],
          "supermarket" : [ {
            "label" : "Sainsbury's",
            "zscore" : 2.388891339237046,
            "entity" : "bfaf5e20-a904-11e1-9412-005056900141"
          }, {
            "label" : "Marks & Spencer",
            "zscore" : 1.412754195826233,
            "entity" : "bfbea06a-a904-11e1-9412-005056900141"
          }, {
            "label" : "Aldi",
            "zscore" : 1.0078535576450318,
            "entity" : "bfbea085-a904-11e1-9412-005056900141"
          }, {
            "label" : "Makro",
            "zscore" : 0.8168062081524194,
            "entity" : "1f89a4e0-2636-11e2-b2a9-005056900141"
          }, {
            "label" : "Costco",
            "zscore" : 0.7832454859206699,
            "entity" : "c28cb472-a904-11e1-9412-005056900141"
          }, {
            "label" : "Tesco",
            "zscore" : 0.7727021650135691,
            "entity" : "bfaf5e23-a904-11e1-9412-005056900141"
          }, {
            "label" : "Morrisons",
            "zscore" : 0.7324658661553938,
            "entity" : "bb011850-a904-11e1-9412-005056900141"
          }, {
            "label" : "Waitrose",
            "zscore" : 0.6819868224308614,
            "entity" : "bfaf5e29-a904-11e1-9412-005056900141"
          }, {
            "label" : "Lidl",
            "zscore" : -0.29754964404950485,
            "entity" : "bb00ca3d-a904-11e1-9412-005056900141"
          }, {
            "label" : "Booths",
            "zscore" : -0.7179639557303542,
            "entity" : "c02b1dce-a904-11e1-9412-005056900141"
          } ]
        },
        "media" : {
          "hours_online" : [ {
            "label" : "26-30",
            "zscore" : 3.601823984214802
          }, {
            "label" : "21-25",
            "zscore" : 2.6650738358514294
          }, {
            "label" : "16-20",
            "zscore" : 2.5551856182879846
          }, {
            "label" : "31-35",
            "zscore" : 1.8591390739976963
          }, {
            "label" : "11-15",
            "zscore" : 1.8318350205754332
          }, {
            "label" : "50+",
            "zscore" : 0.634111477778955
          }, {
            "label" : "46-50",
            "zscore" : 0.0899425742323452
          }, {
            "label" : "41-45",
            "zscore" : -0.32778781719004657
          }, {
            "label" : "36-40",
            "zscore" : -0.7478180303214156
          }, {
            "label" : "6-10",
            "zscore" : -2.7640611885082307
          }, {
            "label" : "Less than 1",
            "zscore" : -2.8870149849099875
          }, {
            "label" : "1-5",
            "zscore" : -4.636613174535169
          } ],
          "hours_tv" : [ {
            "label" : "26-30",
            "zscore" : 6.546771891406391
          }, {
            "label" : "21-25",
            "zscore" : 6.143443907393349
          }, {
            "label" : "31-35",
            "zscore" : 4.685647469976528
          }, {
            "label" : "36-40",
            "zscore" : 3.149538998390065
          }, {
            "label" : "41-45",
            "zscore" : 3.078993264018538
          }, {
            "label" : "16-20",
            "zscore" : 1.637016291214312
          }, {
            "label" : "46-50",
            "zscore" : 0.7904363494386955
          }, {
            "label" : "11-15",
            "zscore" : -0.32142042152755523
          }, {
            "label" : "50+",
            "zscore" : -0.4555019845682038
          }, {
            "label" : "6-10",
            "zscore" : -3.3219866138113434
          }, {
            "label" : "Less than 1",
            "zscore" : -4.629696623870799
          }, {
            "label" : "1-5",
            "zscore" : -6.924568272364858
          } ],
          "newspapers" : [ {
            "label" : "Daily Mail",
            "zscore" : 56.10172866206828
          }, {
            "label" : "Daily Telegraph",
            "zscore" : 1.6740120335558621
          }, {
            "label" : "Daily Express",
            "zscore" : -2.207981724203475
          }, {
            "label" : "The Western Mail",
            "zscore" : -2.3722149729016833
          }, {
            "label" : "Financial Times",
            "zscore" : -2.902692433330346
          }, {
            "label" : "The Scotsman",
            "zscore" : -3.1429699501690904
          }, {
            "label" : "The Daily Star",
            "zscore" : -3.3499586047256837
          }, {
            "label" : "The Herald",
            "zscore" : -3.743086426571457
          }, {
            "label" : "Times",
            "zscore" : -4.917235484929332
          }, {
            "label" : "Independent",
            "zscore" : -8.78114990672334
          } ],
          "magazines" : [ {
            "label" : "Woman and Home",
            "zscore" : 5.953037016800827,
            "entity" : "bab59055-a904-11e1-9412-005056900141"
          }, {
            "label" : "Home & Garden Magazines",
            "zscore" : 4.697397601057854,
            "entity" : "bab6c8db-a904-11e1-9412-005056900141"
          }, {
            "label" : "Hello! Magazine",
            "zscore" : 4.215070604652221,
            "entity" : "bab59051-a904-11e1-9412-005056900141"
          }, {
            "label" : "Good Housekeeping",
            "zscore" : 3.663823999392007,
            "entity" : "bb0bc6b0-a904-11e1-9412-005056900141"
          }, {
            "label" : "Tatler",
            "zscore" : 2.937751779173666,
            "entity" : "bac34bfb-a904-11e1-9412-005056900141"
          }, {
            "label" : "Grazia",
            "zscore" : 2.8889252070625346,
            "entity" : "bb0bedc3-a904-11e1-9412-005056900141"
          }, {
            "label" : "House and Garden",
            "zscore" : 2.5373800276999816,
            "entity" : "bb0b5176-a904-11e1-9412-005056900141"
          }, {
            "label" : "Easy Living",
            "zscore" : 2.423767989598661,
            "entity" : "bb12cb83-a904-11e1-9412-005056900141"
          }, {
            "label" : "Red",
            "zscore" : 2.3128074877064067,
            "entity" : "bab5de70-a904-11e1-9412-005056900141"
          }, {
            "label" : "Heat",
            "zscore" : 2.02894486387509,
            "entity" : "bbac9a8a-a904-11e1-9412-005056900141"
          } ],
          "tv_programmes" : [ {
            "label" : "ITV News & Weather",
            "zscore" : 11.311719938131745
          }, {
            "label" : "Regional News and Weather",
            "zscore" : 9.864101143675816
          }, {
            "label" : "BBC News at Six",
            "zscore" : 8.522517793981335
          }, {
            "label" : "ITV News at Ten & Weather",
            "zscore" : 7.663851913353885
          }, {
            "label" : "BBC News at One",
            "zscore" : 7.3973131953205575
          }, {
            "label" : "BBC News",
            "zscore" : 7.2644004843839936
          }, {
            "label" : "The One Show",
            "zscore" : 6.653934484045451
          }, {
            "label" : "Breakfast",
            "zscore" : 6.216329871661217
          }, {
            "label" : "The Chase",
            "zscore" : 5.8235562923619675
          }, {
            "label" : "Countryfile",
            "zscore" : 5.765330012046362
          } ]
        },
        "entertainment" : {
          "tv_shows" : [ {
            "label" : "Downton Abbey",
            "zscore" : 3.4291265593550904,
            "entity" : "bbb266e7-a904-11e1-9412-005056900141"
          }, {
            "label" : "Strictly Come Dancing",
            "zscore" : 2.859205125011532,
            "entity" : "bba8f100-a904-11e1-9412-005056900141"
          }, {
            "label" : "Casualty",
            "zscore" : 2.624732366025669,
            "entity" : "bb3ac604-a904-11e1-9412-005056900141"
          }, {
            "label" : "Law & Order: UK",
            "zscore" : 2.3268915074387553,
            "entity" : "bc789d34-a904-11e1-9412-005056900141"
          }, {
            "label" : "Wire in the Blood",
            "zscore" : 2.2919827718414867,
            "entity" : "bdb059e9-a904-11e1-9412-005056900141"
          }, {
            "label" : "The Persuaders!",
            "zscore" : 2.228302183404768,
            "entity" : "bdb059f0-a904-11e1-9412-005056900141"
          }, {
            "label" : "Saturday Kitchen",
            "zscore" : 2.0331275818246297,
            "entity" : "bb33c100-a904-11e1-9412-005056900141"
          }, {
            "label" : "Benidorm",
            "zscore" : 1.9983709531804477,
            "entity" : "bbbe4ddb-a904-11e1-9412-005056900141"
          }, {
            "label" : "Hotel India",
            "zscore" : 1.9787573684328061,
            "entity" : "fd336d30-3e71-11e4-931b-005056900141"
          }, {
            "label" : "Doc Martin",
            "zscore" : 1.9549760872613482,
            "entity" : "bb340f3c-a904-11e1-9412-005056900141"
          } ],
          "movies" : [ {
            "label" : "Hello Dolly!",
            "zscore" : 2.467435757339373,
            "entity" : "ba63c6da-a904-11e1-9412-005056900141"
          }, {
            "label" : "Mrs. Miniver",
            "zscore" : 2.348220488158567,
            "entity" : "ba66fb28-a904-11e1-9412-005056900141"
          }, {
            "label" : "Close Encounters of the Third Kind",
            "zscore" : 2.168547574436046,
            "entity" : "ba510221-a904-11e1-9412-005056900141"
          }, {
            "label" : "E.T. the Extra-Terrestrial",
            "zscore" : 2.1583516063180124,
            "entity" : "ba61f210-a904-11e1-9412-005056900141"
          }, {
            "label" : "Evita",
            "zscore" : 1.9942258543974984,
            "entity" : "ba401239-a904-11e1-9412-005056900141"
          }, {
            "label" : "Saving Private Ryan",
            "zscore" : 1.9481787015217902,
            "entity" : "ba694510-a904-11e1-9412-005056900141"
          }, {
            "label" : "Meet the Parents",
            "zscore" : 1.9180160830380886,
            "entity" : "ba6685f0-a904-11e1-9412-005056900141"
          }, {
            "label" : "It Happened One Night",
            "zscore" : 1.8830586068751527,
            "entity" : "ba64d842-a904-11e1-9412-005056900141"
          }, {
            "label" : "Jersey Boys",
            "zscore" : 1.864044756496846,
            "entity" : "d34a5ff0-fcaf-11e3-806f-005056900141"
          }, {
            "label" : "A Star Is Born",
            "zscore" : 1.8608346617027234,
            "entity" : "ba49fd44-a904-11e1-9412-005056900141"
          } ],
          "music_artists" : [ {
            "label" : "Cliff Richard",
            "zscore" : 3.145449806824027,
            "entity" : "ba3eb2a0-a904-11e1-9412-005056900141"
          }, {
            "label" : "Dolly Parton",
            "zscore" : 2.9664834714496866,
            "entity" : "ba3f75f4-a904-11e1-9412-005056900141"
          }, {
            "label" : "Victoria Beckham",
            "zscore" : 2.7447316612599604,
            "entity" : "bb7a18da-a904-11e1-9412-005056900141"
          }, {
            "label" : "The Hollies",
            "zscore" : 2.5248678327775638,
            "entity" : "ba478c48-a904-11e1-9412-005056900141"
          }, {
            "label" : "The Beach Boys",
            "zscore" : 2.2333995933228836,
            "entity" : "ba473e26-a904-11e1-9412-005056900141"
          }, {
            "label" : "Bee Gees",
            "zscore" : 2.1504708132361947,
            "entity" : "ba284475-a904-11e1-9412-005056900141"
          }, {
            "label" : "Captain and Tennille",
            "zscore" : 2.100912769975107,
            "entity" : "bfd8df28-a904-11e1-9412-005056900141"
          }, {
            "label" : "Neil Diamond",
            "zscore" : 2.084960157592966,
            "entity" : "ba447f06-a904-11e1-9412-005056900141"
          }, {
            "label" : "The Alan Parsons Project",
            "zscore" : 2.0139914787154223,
            "entity" : "be57bd7b-a904-11e1-9412-005056900141"
          }, {
            "label" : "The Four Seasons",
            "zscore" : 2.00956330873712,
            "entity" : "bfcbe6db-a904-11e1-9412-005056900141"
          } ],
          "celebrities" : [ {
            "label" : "Lynda Bellingham",
            "zscore" : 3.353142803052775,
            "entity" : "37295920-5842-11e4-8f47-005056900141"
          }, {
            "label" : "Adam Boulton",
            "zscore" : 3.325057679132113,
            "entity" : "bbb218dd-a904-11e1-9412-005056900141"
          }, {
            "label" : "Janet Street-Porter",
            "zscore" : 2.973523636206786,
            "entity" : "bb3bfe67-a904-11e1-9412-005056900141"
          }, {
            "label" : "Eamonn Holmes",
            "zscore" : 2.9650754846124485,
            "entity" : "bb29d607-a904-11e1-9412-005056900141"
          }, {
            "label" : "Len Goodman",
            "zscore" : 2.794537838164511,
            "entity" : "bb6b24b7-a904-11e1-9412-005056900141"
          }, {
            "label" : "Kay Burley",
            "zscore" : 2.760968142260626,
            "entity" : "bbb218de-a904-11e1-9412-005056900141"
          }, {
            "label" : "Alan Titchmarsh",
            "zscore" : 2.5607731676017558,
            "entity" : "bb6afda6-a904-11e1-9412-005056900141"
          }, {
            "label" : "Jeremy Clarkson",
            "zscore" : 2.5353206842587377,
            "entity" : "bb6afdab-a904-11e1-9412-005056900141"
          }, {
            "label" : "Dermot Murnaghan",
            "zscore" : 2.4791938756964083,
            "entity" : "bb2912b4-a904-11e1-9412-005056900141"
          }, {
            "label" : "David Jason",
            "zscore" : 2.3438818716175556,
            "entity" : "bb5e537b-a904-11e1-9412-005056900141"
          } ]
        },
        "online" : {
          "facebook_likes" : [ {
            "label" : "Daily Mail",
            "zscore" : 4.804864921794596
          }, {
            "label" : "MailShop",
            "zscore" : 3.586174804339443
          }, {
            "label" : "Mail Travel",
            "zscore" : 3.1064699171588295
          }, {
            "label" : "You Magazine",
            "zscore" : 2.8878818914206885
          }, {
            "label" : "UK Independence Party (UKIP)",
            "zscore" : 2.8518819092490437
          }, {
            "label" : "Thomas Cook UK",
            "zscore" : 2.538618929287077
          }, {
            "label" : "British Airways",
            "zscore" : 2.507465189602271
          }, {
            "label" : "Visit Melbourne",
            "zscore" : 2.476877316346071
          }, {
            "label" : "My room was clean, but then i needed something....",
            "zscore" : 2.429622022261251
          }, {
            "label" : "BBC Good Food",
            "zscore" : 2.4193602894823356
          } ],
          "twitter_followings" : [ {
            "label" : "GuidoFawkes",
            "zscore" : 2.829445047749393
          }, {
            "label" : "FraserNelson",
            "zscore" : 2.58070392632149
          }, {
            "label" : "Kevin_Maguire",
            "zscore" : 2.45909382588043
          }, {
            "label" : "bbclaurak",
            "zscore" : 2.438283206786833
          }, {
            "label" : "IainDale",
            "zscore" : 2.4222146069051846
          }, {
            "label" : "afneil",
            "zscore" : 2.365418327936984
          }, {
            "label" : "Nigel_Farage",
            "zscore" : 2.341894346439316
          }, {
            "label" : "SkyNewsBreak",
            "zscore" : 2.227404474928848
          }, {
            "label" : "MichaelLCrick",
            "zscore" : 2.2151966802812177
          }, {
            "label" : "paulwaugh",
            "zscore" : 2.131146482714126
          } ],
          "websites" : [ {
            "label" : "mailonline.co.uk",
            "zscore" : 6.242710280206245
          }, {
            "label" : "mymail.co.uk",
            "zscore" : 4.884590187957991
          }, {
            "label" : "mailshopmemberdeals.co.uk",
            "zscore" : 4.171740051359644
          }, {
            "label" : "mailrewardsclub.co.uk",
            "zscore" : 4.07400957755057
          }, {
            "label" : "mailtravel.co.uk",
            "zscore" : 2.9382167325446154
          }, {
            "label" : "emv3.com",
            "zscore" : 2.4348594832674952
          }, {
            "label" : "wilko.com",
            "zscore" : 2.3023645669003945
          }, {
            "label" : "fragrancedirect.co.uk",
            "zscore" : 2.3013862258668842
          }, {
            "label" : "whatsontv.co.uk",
            "zscore" : 2.293651263697261
          }, {
            "label" : "tiffany.co.uk",
            "zscore" : 2.276415851593655
          } ],
          "mobile_applications" : [ {
            "label" : "MailOnline",
            "zscore" : 6.655867644674162,
            "entity" : "bb1319cc-a904-11e1-9412-005056900141"
          }, {
            "label" : "Sky News",
            "zscore" : 2.4077432588516774,
            "entity" : "bb3101f8-a904-11e1-9412-005056900141"
          }, {
            "label" : "ITV Player",
            "zscore" : 1.894948581239554,
            "entity" : "bb1367e6-a904-11e1-9412-005056900141"
          }, {
            "label" : "My O2",
            "zscore" : 1.7557948715620764,
            "entity" : "bb30dae8-a904-11e1-9412-005056900141"
          }, {
            "label" : "AA Route Planner",
            "zscore" : 1.6361345763649733,
            "entity" : "bb319e34-a904-11e1-9412-005056900141"
          }, {
            "label" : "Nectar",
            "zscore" : 1.3600259557755348,
            "entity" : "c2cd18d5-a904-11e1-9412-005056900141"
          }, {
            "label" : "The Telegraph",
            "zscore" : 1.3342522362692635,
            "entity" : "bff71583-a904-11e1-9412-005056900141"
          }, {
            "label" : "AroundMe",
            "zscore" : 1.3072309469129593,
            "entity" : "bb3101f9-a904-11e1-9412-005056900141"
          }, {
            "label" : "Google Books",
            "zscore" : 1.3072309469129593,
            "entity" : "bb30daf0-a904-11e1-9412-005056900141"
          }, {
            "label" : "First Direct App",
            "zscore" : 1.275442529494176,
            "entity" : "bbcb9431-a904-11e1-9412-005056900141"
          } ]
        },
        "statistics" : {
          "age" : {
            "position" : 30,
            "total" : 43
          },
          "gender" : {
            "position" : 1,
            "total" : 43
          },
          "politics" : {
            "position" : 34,
            "total" : 43
          },
          "ratings" : {
            "hates" : 11594,
            "dislikes" : 2560,
            "neutrals" : 2644,
            "likes" : 2784,
            "loves" : 978
          }
        }
      }
    }