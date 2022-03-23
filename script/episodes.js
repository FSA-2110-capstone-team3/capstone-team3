
// const episodes = [
//   {
//     spotify_id: '1',
//     name: 'test-episode-1',
//     description: 'test-episode-description',
//     duration_ms: '5',
//     href: 'http://testurl.com',
//     release_date: '2021-01-01',
//     "audio_preview_url": "http://test-url",
//     images: ['Neon-podcast-logo.jpg']
//   },
//   {
//     spotify_id: '2',
//     name: 'test-episode-2',
//     description: 'test-episode-description',
//     duration_ms: '5',
//     href: 'http://testurl.com',
//     release_date: '2021-01-01',
//     "audio_preview_url": "http://test-url",
//     images: ['Neon-podcast-logo.jpg']
//   },
//   {
//     spotify_id: '3',
//     name: 'test-episode-1',
//     description: 'test-episode-description',
//     duration_ms: '5',
//     href: 'http://testurl.com',
//     release_date: '2021-01-01',
//     "audio_preview_url": "http://test-url",
//     images: ['Neon-podcast-logo.jpg']
//   },
//   {
//     spotify_id: '4',
//     name: 'test-episode-2',
//     description: 'test-episode-description',
//     duration_ms: '5',
//     href: 'http://testurl.com',
//     release_date: '2021-01-01',
//     "audio_preview_url": "http://test-url",
//     images: ['Neon-podcast-logo.jpg']
//   },
//   {
//     spotify_id: '5',
//     name: 'test-episode-1',
//     description: 'test-episode-description',
//     duration_ms: '5',
//     href: 'http://testurl.com',
//     release_date: '2021-01-01',
//     "audio_preview_url": "http://test-url",
//     images: ['Neon-podcast-logo.jpg']
//   },
//   {
//     spotify_id: '6',
//     name: 'test-episode-2',
//     description: 'test-episode-description',
//     duration_ms: '5',
//     href: 'http://testurl.com',
//     release_date: '2021-01-01',
//     "audio_preview_url": "http://test-url",
//     images: ['Neon-podcast-logo.jpg']
//   },
//   //Joe Rogan Show
//   {
//     "name": "#1793 - Mike Baker",
//     href: "https://api.spotify.com/v1/episodes/44i3nQNm6yXV9jS9FUZHI0",
//     "release_date": "2022-03-19",
//     "description": "Mike Baker is a former CIA covert operations officer and current CEO of Portman Square Group, a global intelligence firm. He's also the host of \"Black Files Declassified\" on Discovery+ and the Science Channel.",
//     "duration_ms": 10293588,
//     spotify_id: "44i3nQNm6yXV9jS9FUZHI0",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/44899ea55bcf109d64289a4f440b39da18124ced",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8a9678fcf20e9d6d7d366e06f6",
//             "width": 640
//         },
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8a9678fcf20e9d6d7d366e06f6",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ab67656300005f1f9678fcf20e9d6d7d366e06f6",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/ab6765630000f68d9678fcf20e9d6d7d366e06f6",
//             "width": 64
//         }
//     ]
//   },
//   {
//     "name": "#1791 - Sadhguru",
//     "href": "https://api.spotify.com/v1/episodes/0zN02uiYg9KUwYs4JY8Nwg",
//     "release_date": "2022-03-14",
//     "description": "Sadhguru is a yogi, mystic and visionary. Named one of India’s 50 most influential people, and recipient of 3 presidential awards, Sadhguru has touched the lives of millions worldwide through his transformational programs.  An internationally renowned speaker and author of the New York Times bestsellers \"Inner Engineering\" and \"Karma,\" Sadhguru has been an influential voice at major global forums like the United Nations and the World Economic Forum, addressing issues as diverse as socioeconomic development, leadership and spirituality. He established Isha Foundation, a non-profit, volunteer-run organization supported by over 16 million volunteers worldwide, and has initiated several projects for social revitalization, education and the environment.",
//     "duration_ms": 10221865,
//     spotify_id: "0zN02uiYg9KUwYs4JY8Nwg",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/f4f51ba8abfd70024213614634f11e6174598463",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8ab74adc264d041834447da328",
//             "width": 640
//         },
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8ab74adc264d041834447da328",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ab67656300005f1fb74adc264d041834447da328",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/ab6765630000f68db74adc264d041834447da328",
//             "width": 64
//         }
//     ]
//   },
//   {
//     "name": "#1790 - Nims Purja",
//     "href": "https://api.spotify.com/v1/episodes/0JEBeXmsbltKWYuf4TqJ6k",
//     "release_date": "2022-03-09",
//     "description": "Nims is the multi world record breaking mountaineer who climbed all 14 of the world’s ‘Death Zone’ peaks over 8,000m in just 6 months and 6 days. He was part of the first winter ascent of the ‘Savage Mountain’ K2. His film, \"14 Peaks: Nothing Is Impossible,\" is out now on Netflix, as is his best-selling book, \"Beyond Possible.\" Nims is a UNEP Mountain Advocate and founder of the Nimsdai Foundation.",
//     "duration_ms": 7806398,
//     spotify_id: "0JEBeXmsbltKWYuf4TqJ6k",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/f3f1deaad63c9f4db17427ac7f91313f772b1064",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8a320a6e59a7f93445f4376feb",
//             "width": 640
//         },
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8a320a6e59a7f93445f4376feb",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ab67656300005f1f320a6e59a7f93445f4376feb",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/ab6765630000f68d320a6e59a7f93445f4376feb",
//             "width": 64
//         }
//     ]
//   },
//   // The Daily
//   {
//     "name": "The Global Race to Mine the Metal of the Future",
//     "href": "https://api.spotify.com/v1/episodes/6waZCgTW5kJUG0yaLeTBPO",
//     "release_date": "2022-03-18",
//     "description": "In the high-stakes competition to dominate the business of clean energy, the Democratic Republic of Congo is a major arena: The country is the source of more than two-thirds of the world’s cobalt, a key component of electric-car batteries.In recent years, China has established a strong presence in Congo, while the United States has lost ground. We went to the African country to understand how that happened.Guest: Dionne Searcey, a correspondent for The New York Times.Have you lost a loved one during the pandemic? The Daily is working on a special episode memorializing those we have lost to the coronavirus. If you would like to share their name on the episode, please RECORD A VOICE MEMO and send it to us at thedaily@nytimes.com. You can find more information and specific instructions here.Background reading: The United States failed to safeguard decades of diplomatic and financial investments in Congo, where the world’s largest supply of cobalt is now controlled by Chinese companies backed by Beijing.The power struggle over Congo’s cobalt has rattled the clean-energy revolution.Want more from The Daily? For one big idea on the news each week from our team, subscribe to our newsletter. For more information on today’s episode, visit nytimes.com/thedaily. Transcripts of each episode will be made available by the next workday. ",
//     "duration_ms": 1609560,
//     spotify_id: "6waZCgTW5kJUG0yaLeTBPO",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/456c05f4439a3176f038e10c20f51f4e6587a682",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/1b5af843be11feb6c563e0d95f5fe0dad659b757",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ef570afd43d43da66c9e5df3957e049f5c3464c3",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/7fe2b992063ef9490d236547b1eccee07db8a87d",
//             "width": 64
//         }
//     ]
//   },
//   {
//     "name": "Four Paths Forward in Ukraine",
//     "href": "https://api.spotify.com/v1/episodes/15vQotHpMwJxL5EBxVWwed",
//     "release_date": "2022-03-17",
//     "description": "It has been three weeks since the war in Ukraine began. The fighting grinds on and there is no clear end in sight. But what are the potential paths forward in the coming days and weeks?On Wednesday, President Volodymyr Zelensky, in an address to Congress, proposed one such path, though it is an incredibly unlikely one: a no-fly zone over Ukraine.Elsewhere, Times reporting has suggested four other potential scenarios — a diplomatic end to the conflict; protracted monthslong fighting; China coming to Russia’s rescue; and President Vladimir V. Putin expanding the conflict beyond Ukraine’s borders.We explore these scenarios and consider which of them is most likely to occur.Guest: David E. Sanger, a White House and national security correspondent for The New York Times.Have you lost a loved one during the pandemic? The Daily is working on a special episode memorializing those we have lost to the coronavirus. If you would like to share their name on the episode, please RECORD A VOICE MEMO and send it to us at thedaily@nytimes.com. You can find more information and specific instructions here.Background reading: The United States accurately predicted the start of the war in Ukraine, sounding the alarm that an invasion was imminent despite Moscow’s denials and Europe’s skepticism. Predicting how it might end is proving far more difficult.In a speech to Congress, President Volodymyr Zelensky of Ukraine called for a no-fly zone and more weapons to combat Russia’s assault and implored President Biden to be “the leader of peace.”Want more from The Daily? For one big idea on the news each week from our team, subscribe to our newsletter. For more information on today’s episode, visit nytimes.com/thedaily. Transcripts of each episode will be made available by the next workday. ",
//     "duration_ms": 1672488,
//     spotify_id: "15vQotHpMwJxL5EBxVWwed",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/4912778468363a7cb3118e581945d29cb738388c",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/1b5af843be11feb6c563e0d95f5fe0dad659b757",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ef570afd43d43da66c9e5df3957e049f5c3464c3",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/7fe2b992063ef9490d236547b1eccee07db8a87d",
//             "width": 64
//         }
//     ]
//   },
//   {
//     "name": "Inflation Lessons From the 1970s",
//     "href": "https://api.spotify.com/v1/episodes/77PH8zpr3GN96I8QQnNQV0",
//     "release_date": "2022-03-16",
//     "description": "With prices on the rise in the U.S. economy, the Federal Reserve is expected to announce on Wednesday an increase in interest rates, essentially pouring a cold glass of water on the economy.Why would the central bank do that? The answer lies in the inflation crisis of the 1970s, when a failure to react quickly enough still looms large in the memory.Guest: Jeanna Smialek, a reporter covering the Federal Reserve and the economy for The New York Times.Have you lost a loved one during the pandemic? The Daily is working on a special episode memorializing those we have lost to the coronavirus. If you would like to share their name on the episode, please RECORD A VOICE MEMO and send it to us at thedaily@nytimes.com. You can find more information and specific instructions here.Background reading: The Federal Reserve is facing the fastest inflation most Americans have ever seen. The response may require some aggressive — and painful — measures.What is inflation, why is it up, and whom does it hurt? Here’s what to know.Want more from The Daily? For one big idea on the news each week from our team, subscribe to our newsletter. For more information on today’s episode, visit nytimes.com/thedaily. Transcripts of each episode will be made available by the next workday. ",
//     "duration_ms": 1756081,
//     spotify_id: "77PH8zpr3GN96I8QQnNQV0",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/b68fd9b0cc8e1bcc1087311ad30d928e0afd10ca",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/1b5af843be11feb6c563e0d95f5fe0dad659b757",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ef570afd43d43da66c9e5df3957e049f5c3464c3",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/7fe2b992063ef9490d236547b1eccee07db8a87d",
//             "width": 64
//         }
//     ]
//   },
//   // Up First
//   {
//     "name": "Left Behind, A War Story",
//     "href": "https://api.spotify.com/v1/episodes/39Q1wpv5nshB0ejmOqnloE",
//     "release_date": "2022-03-20",
//     "description": "Seven months ago, the U.S. withdrew the last of its troops from Afghanistan, bringing to an end a 20-year war. At the time, President Biden promised the Afghan interpreters who'd worked side by side with American troops that the U.S. would stand by and offer them safe haven in the United States. But thousands of interpreters who wanted to get out were unable to do so before the Taliban took over, in part because of a slow and bureaucratic visa process. Since last fall, NPR has been in touch with one of these interpreters who is now in hiding because of the threat of Taliban retribution. On this episode of Up First Sunday, we bring you his story, as well as the story of a former veteran who is working tirelessly to help his \"Afghan brothers\" escape.",
//     "duration_ms": 1448907,
//     spotify_id: "39Q1wpv5nshB0ejmOqnloE",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/0c82a37aa1a00377a3e26d4dea88e9bb1d8ea5b1",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8add0bf7383ab172c76dcfe93e",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ab67656300005f1fdd0bf7383ab172c76dcfe93e",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/ab6765630000f68ddd0bf7383ab172c76dcfe93e",
//             "width": 64
//         }
//     ]
//   },
//   {
//     "name": "Saturday, March 19, 2022",
//     "href": "https://api.spotify.com/v1/episodes/0SC0SSBupImiocLDxQmZ2O",
//     "release_date": "2022-03-19",
//     "description": "We have the latest on Ukraine, where Russian assault on several cities continues. Yesterday, President Biden talked to China's President Xi Jinping about the consequences China could face for assisting Russia in its conflict with Ukraine. And a new omicron subvariant has public health officials in the U.S. on alert about the possibility of another rise in COVID cases.",
//     "duration_ms": 848091,
//     spotify_id: "0SC0SSBupImiocLDxQmZ2O",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/c165187977d45c56eda006bff52e52bdc51b81e6",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8a118d493142dea824e5ea11c1",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ab67656300005f1f118d493142dea824e5ea11c1",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/ab6765630000f68d118d493142dea824e5ea11c1",
//             "width": 64
//         }
//     ]
//   },
//   {
//     "name": "Friday, March 18, 2022",
//     "href": "https://api.spotify.com/v1/episodes/7GAJDSZvbWtfGRrFabnq9Y",
//     "release_date": "2022-03-18",
//     "description": "President Biden schedules a phone call with China's leader Xi Jinping to discuss Russia's bombardment of Ukraine. Ukraine's hospital personnel struggle to treat patients coping with dual traumas of illness and war. And Moderna asks the FDA to greenlight another COVID booster shot for all U.S. adults.",
//     "duration_ms": 749531,
//     spotify_id: "7GAJDSZvbWtfGRrFabnq9Y",
//     "audio_preview_url": "https://p.scdn.co/mp3-preview/930d511cd7bec9db12a2c4275d52aec978f68092",
//     "images": [
//         {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6765630000ba8a118d493142dea824e5ea11c1",
//             "width": 640
//         },
//         {
//             "height": 300,
//             "url": "https://i.scdn.co/image/ab67656300005f1f118d493142dea824e5ea11c1",
//             "width": 300
//         },
//         {
//             "height": 64,
//             "url": "https://i.scdn.co/image/ab6765630000f68d118d493142dea824e5ea11c1",
//             "width": 64
//         }
//     ]
//   }
// ];

// module.exports = episodes;