# Codebreaker — every decision the solver makes

Opening is always **1122** (worst case 256 of 1296).

Move 5 is never a decision: all 694 states reaching it have exactly one candidate left.

Colours are numbered 1-6 = red, orange, yellow, green, blue, purple.


## Move 2 — 11 decisions

| answers so far | left | play | worst | unresolved | confirmed | dead | locked slots | generated explanation |
|---|---|---|---|---|---|---|---|---|
| `0b0w` | 256 | **3345** | 46 | 3456 | — | 12 | — | 2 colours ruled out; tests 3 of the 4 unresolved colours, rest goes on position |
| `0b1w` | 256 | **2344** | 44 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `0b2w` | 96 | **2344** | 18 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `0b3w` | 16 | **1213** | 4 | 3456 | 12 | — | — | 2 confirmed in; tests 1 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w` | 256 | **1344** | 44 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `1b1w` | 208 | **1134** | 38 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `1b2w` | 36 | **1213** | 7 | 3456 | 12 | — | — | 2 confirmed in; tests 1 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w` | 114 | **1234** | 21 | 123456 | — | — | — | nothing settled yet; tests 4 of the 6 unresolved colours, rest goes on position |
| `2b1w` | 32 | **1223** | 6 | 3456 | 12 | — | — | 2 confirmed in; tests 1 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b2w` | 4 | **1213** | 1 | — | 12 | 3456 | — | 4 colours ruled out, 2 confirmed in; colour question closed, so it only rearranges what it knows |
| `3b0w` | 20 | **1223** | 5 | 3456 | 12 | — | — | 2 confirmed in; tests 1 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |

## Move 3 — 94 decisions

| answers so far | left | play | worst | unresolved | confirmed | dead | locked slots | generated explanation |
|---|---|---|---|---|---|---|---|---|
| `0b0w > 0b1w` | 16 | **6646** | 3 | 345 | 6 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 1 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 0b2w` | 42 | **6634** | 6 | 3456 | — | 12 | — | 2 colours ruled out; tests 3 of the 4 unresolved colours, rest goes on position |
| `0b0w > 0b3w` | 20 | **4653** | 3 | 456 | 3 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 3 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 0b4w` | 2 | **4533** | 1 | — | 345 | 126 | 3=3 4=3 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 1b0w` | 18 | **3656** | 3 | 3456 | — | 12 | — | 2 colours ruled out; tests 3 of the 4 unresolved colours, rest goes on position |
| `0b0w > 1b1w` | 46 | **3636** | 6 | 3456 | — | 12 | — | 2 colours ruled out; tests 2 of the 4 unresolved colours, rest goes on position |
| `0b0w > 1b2w` | 40 | **3454** | 6 | 456 | 3 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b3w` | 4 | **3453** | 1 | — | 345 | 126 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b0w > 2b0w` | 29 | **3636** | 4 | 3456 | — | 12 | — | 2 colours ruled out; tests 2 of the 4 unresolved colours, rest goes on position |
| `0b0w > 2b1w` | 20 | **3443** | 4 | 456 | 3 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 1 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 2b2w` | 5 | **3435** | 2 | — | 345 | 126 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b0w > 3b0w` | 12 | **3446** | 2 | 456 | 3 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 0b0w` | 16 | **5515** | 3 | 56 | 1 | 234 | — | 3 colours ruled out, 1 confirmed in; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 0b1w` | 44 | **3516** | 7 | 123456 | — | — | — | nothing settled yet; tests 4 of the 6 unresolved colours, rest goes on position |
| `0b1w > 0b2w` | 41 | **3235** | 6 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `0b1w > 0b3w` | 7 | **2335** | 1 | 1256 | 34 | — | 1=4 | 2 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b0w` | 34 | **3315** | 5 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `0b1w > 1b1w` | 42 | **4514** | 7 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `0b1w > 1b2w` | 21 | **3245** | 3 | 12356 | 4 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b3w` | 2 | **4234** | 1 | — | 234 | 156 | 1=4 2=2 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 2b0w` | 23 | **1545** | 4 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `0b1w > 2b1w` | 13 | **2425** | 2 | 12356 | 4 | — | — | 1 confirmed in; tests 2 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 2b2w` | 3 | **2434** | 1 | — | 234 | 156 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b1w > 3b0w` | 9 | **1335** | 2 | 356 | 24 | 1 | 1=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, rest goes on position |
| `0b2w > 0b0w` | 4 | **1515** | 1 | 56 | 1 | 234 | 3=1 4=1 | 3 colours ruled out, 1 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b2w > 0b1w` | 14 | **5215** | 3 | 23456 | 1 | — | — | 1 confirmed in; tests 2 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b2w > 0b2w` | 16 | **3215** | 3 | 23456 | 1 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b2w > 0b3w` | 2 | **4213** | 1 | — | 1234 | 56 | 1=4 2=2 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b2w > 1b0w` | 15 | **2256** | 2 | 12356 | — | 4 | — | 1 colour ruled out; tests 3 of the 5 unresolved colours, rest goes on position |
| `0b2w > 1b1w` | 18 | **2415** | 3 | 123456 | — | — | — | nothing settled yet; tests 4 of the 6 unresolved colours, rest goes on position |
| `0b2w > 1b2w` | 6 | **2413** | 1 | 3 | 124 | 56 | — | 2 colours ruled out, 3 confirmed in; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `0b2w > 2b0w` | 14 | **3315** | 2 | 13456 | 2 | — | 1=2 | 1 confirmed in, 1 slot locked; tests 3 of the 5 unresolved colours, rest goes on position |
| `0b2w > 2b1w` | 4 | **2234** | 1 | 13 | 24 | 56 | 1=2 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 3b0w` | 3 | **2314** | 1 | 13 | 24 | 56 | 1=2 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b3w > 1b1w` | 3 | **1145** | 1 | 456 | 12 | 3 | 1=2 2=2 4=1 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b3w > 1b2w` | 4 | **1415** | 1 | 3456 | 12 | — | 1=2 4=1 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b3w > 2b0w` | 3 | **1145** | 1 | 456 | 12 | 3 | 1=2 2=2 3=1 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b3w > 2b1w` | 3 | **4115** | 1 | 456 | 12 | 3 | 2=2 3=1 4=1 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 0b0w` | 16 | **5525** | 3 | 56 | 2 | 134 | — | 3 colours ruled out, 1 confirmed in; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 0b1w` | 44 | **3526** | 7 | 123456 | — | — | — | nothing settled yet; tests 4 of the 6 unresolved colours, rest goes on position |
| `1b0w > 0b2w` | 41 | **3135** | 6 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `1b0w > 0b3w` | 7 | **1335** | 1 | 1256 | 34 | — | 1=4 | 2 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b0w` | 34 | **3325** | 5 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `1b0w > 1b1w` | 42 | **4524** | 7 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `1b0w > 1b2w` | 21 | **3145** | 3 | 12356 | 4 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b3w` | 2 | **4134** | 1 | — | 134 | 256 | 1=4 2=1 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 2b0w` | 23 | **1415** | 4 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `1b0w > 2b1w` | 13 | **1415** | 2 | 12356 | 4 | — | — | 1 confirmed in; tests 2 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 2b2w` | 3 | **1434** | 1 | — | 134 | 256 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b0w > 3b0w` | 9 | **1335** | 2 | 356 | 14 | 2 | 1=1 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b0w` | 20 | **2525** | 3 | 56 | 2 | 134 | — | 3 colours ruled out, 1 confirmed in; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b1w` | 38 | **2352** | 7 | 13456 | 2 | — | — | 1 confirmed in; tests 2 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b2w` | 24 | **3521** | 4 | 13456 | 2 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b3w` | 4 | **1312** | 1 | — | 1234 | 56 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 1b0w` | 22 | **1256** | 4 | 13456 | 2 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b1w` | 32 | **1516** | 4 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `1b1w > 1b2w` | 34 | **1315** | 6 | 23456 | 1 | — | — | 1 confirmed in; tests 2 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b3w` | 4 | **1341** | 1 | — | 134 | 256 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 2b0w` | 12 | **1235** | 2 | 3456 | 12 | — | — | 2 confirmed in; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 2b1w` | 12 | **1315** | 2 | 3456 | 1 | 2 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 2b2w` | 4 | **1314** | 1 | — | 134 | 256 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 3b0w` | 2 | **1234** | 1 | — | 1234 | 56 | 3=3 4=4 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b2w > 0b2w` | 3 | **1415** | 1 | 456 | 12 | 3 | 1=2 3=2 4=1 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b2w > 0b3w` | 4 | **1145** | 1 | 3456 | 12 | — | 1=2 4=1 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b2w > 1b1w` | 7 | **2412** | 2 | 456 | 12 | 3 | — | 1 colour ruled out, 2 confirmed in; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b2w > 1b2w` | 6 | **1114** | 2 | 3456 | 12 | — | — | 2 confirmed in; tests 1 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b2w > 2b0w` | 4 | **1145** | 2 | 456 | 12 | 3 | 2=2 3=1 4=2 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b2w > 2b1w` | 4 | **1145** | 1 | 3456 | 12 | — | 2=2 | 2 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b2w > 2b2w` | 2 | **1231** | 1 | — | 123 | 456 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b2w > 3b0w` | 4 | **1114** | 2 | 456 | 12 | 3 | 1=1 2=2 3=1 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 0b1w` | 6 | **2515** | 1 | 56 | 2 | 134 | 3=2 4=2 | 3 colours ruled out, 1 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 0b2w` | 20 | **1325** | 4 | 13456 | 2 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 0b3w` | 16 | **1325** | 3 | 13456 | 2 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 0b4w` | 2 | **3142** | 1 | — | 1234 | 56 | 2=1 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `2b0w > 1b0w` | 12 | **1315** | 2 | 1256 | — | 34 | — | 2 colours ruled out; tests 2 of the 4 unresolved colours, rest goes on position |
| `2b0w > 1b1w` | 16 | **2156** | 2 | 123456 | — | — | — | nothing settled yet; tests 4 of the 6 unresolved colours, rest goes on position |
| `2b0w > 1b2w` | 21 | **1352** | 4 | 23456 | 1 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 1b3w` | 4 | **1323** | 1 | — | 1234 | 56 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `2b0w > 2b0w` | 8 | **1536** | 2 | 3456 | 1 | 2 | 1=1 2=1 | 1 colour ruled out, 1 confirmed in, 2 slots locked; tests 3 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 2b1w` | 6 | **3526** | 1 | 3456 | 12 | — | 1=1 | 2 confirmed in, 1 slot locked; tests 3 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 2b2w` | 2 | **1324** | 1 | — | 1234 | 56 | 1=1 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `2b1w > 0b2w` | 3 | **4115** | 1 | 456 | 12 | 3 | 2=1 3=1 4=2 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b1w > 0b3w` | 4 | **2145** | 1 | 3456 | 12 | — | 2=1 4=2 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b1w > 1b1w` | 6 | **4512** | 1 | 456 | 12 | 3 | — | 1 colour ruled out, 2 confirmed in; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b1w > 1b2w` | 5 | **2145** | 1 | 3456 | 12 | — | — | 2 confirmed in; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b1w > 2b0w` | 3 | **1415** | 1 | 456 | 12 | 3 | 1=1 3=2 4=1 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b1w > 2b1w` | 4 | **1245** | 1 | 3456 | 12 | — | 1=1 | 2 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b1w > 2b2w` | 2 | **1232** | 1 | — | 123 | 456 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `2b1w > 3b0w` | 3 | **1145** | 1 | 456 | 12 | 3 | 1=1 2=2 3=2 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `3b0w > 1b1w` | 4 | **1114** | 2 | 456 | 12 | 3 | 1=1 2=1 4=2 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `3b0w > 1b2w` | 5 | **1145** | 2 | 3456 | 12 | — | 2=1 4=2 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `3b0w > 2b0w` | 4 | **1114** | 2 | 456 | 12 | 3 | 1=1 2=1 3=2 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `3b0w > 2b1w` | 3 | **1415** | 1 | 456 | 12 | 3 | 1=1 3=2 4=2 | 1 colour ruled out, 2 confirmed in, 3 slots locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `3b0w > 3b0w` | 2 | **1123** | 1 | 3 | 12 | 456 | 1=1 3=2 | 3 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 2 confirmed, rest goes on position |

## Move 4 — 320 decisions

| answers so far | left | play | worst | unresolved | confirmed | dead | locked slots | generated explanation |
|---|---|---|---|---|---|---|---|---|
| `0b0w > 0b1w > 1b2w` | 3 | **1416** | 1 | — | 46 | 1235 | 3=6 | 4 colours ruled out, 2 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b1w > 2b0w` | 2 | **5656** | 1 | — | 56 | 1234 | 3=5 4=6 | 4 colours ruled out, 2 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b1w > 2b1w` | 3 | **5666** | 1 | 35 | 6 | 124 | 3=6 | 3 colours ruled out, 1 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 0b1w > 2b2w` | 3 | **1416** | 1 | — | 46 | 1235 | 3=6 | 4 colours ruled out, 2 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b1w > 3b0w` | 2 | **6636** | 1 | 35 | 6 | 124 | 1=6 2=6 4=6 | 3 colours ruled out, 1 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 0b2w > 0b2w` | 4 | **4556** | 1 | 34 | 56 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 0b2w > 0b3w` | 3 | **4566** | 1 | 35 | 46 | 12 | 3=6 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 0b2w > 1b0w` | 4 | **1444** | 1 | — | 45 | 1236 | 3=5 4=4 | 4 colours ruled out, 2 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b2w > 1b1w` | 6 | **5653** | 1 | 34 | 56 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 0b2w > 1b2w` | 5 | **4656** | 1 | 345 | 6 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 0b2w > 1b3w` | 2 | **4663** | 1 | — | 346 | 125 | 3=6 4=3 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b2w > 2b0w` | 5 | **4654** | 1 | 356 | 4 | 12 | 4=4 | 2 colours ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 0b2w > 2b1w` | 5 | **5636** | 1 | 34 | 56 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 0b2w > 2b2w` | 2 | **4636** | 1 | — | 346 | 125 | 3=3 4=6 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b2w > 3b0w` | 4 | **1413** | 1 | 345 | 6 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 2 of the 3 unresolved colours, rest goes on position |
| `0b0w > 0b3w > 0b3w` | 2 | **5434** | 1 | — | 345 | 126 | 1=5 3=3 4=4 | 3 colours ruled out, 3 confirmed in, 3 slots locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b3w > 0b4w` | 2 | **5436** | 1 | — | 3456 | 12 | 3=3 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b3w > 1b2w` | 3 | **4534** | 1 | 456 | 3 | 12 | 3=3 | 2 colours ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 0b3w > 1b3w` | 3 | **4536** | 1 | — | 3456 | 12 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b3w > 2b1w` | 2 | **5453** | 1 | 46 | 35 | 12 | 1=5 4=3 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 0b3w > 2b2w` | 2 | **4563** | 1 | — | 3456 | 12 | 4=3 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 0b3w > 3b0w` | 3 | **4453** | 1 | 56 | 34 | 12 | 1=4 4=3 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 1b0w > 1b0w` | 3 | **4446** | 1 | 456 | — | 123 | — | 3 colours ruled out; tests 2 of the 3 unresolved colours, rest goes on position |
| `0b0w > 1b0w > 1b1w` | 3 | **6446** | 1 | 45 | 6 | 123 | 1=6 | 3 colours ruled out, 1 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b0w > 1b2w` | 3 | **5665** | 1 | 35 | 6 | 124 | 3=6 | 3 colours ruled out, 1 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b0w > 2b0w` | 3 | **4646** | 1 | 45 | 6 | 123 | 2=6 | 3 colours ruled out, 1 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b1w > 0b0w` | 6 | **4544** | 1 | — | 45 | 1236 | — | 4 colours ruled out, 2 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b0w > 1b1w > 0b1w` | 6 | **4565** | 1 | 356 | 4 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b1w > 0b2w` | 3 | **4364** | 1 | 35 | 46 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 1b1w > 1b0w` | 6 | **4546** | 1 | 346 | 5 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b1w > 1b1w` | 6 | **1565** | 1 | 345 | 6 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 1 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b1w > 1b2w` | 5 | **4366** | 1 | 45 | 36 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 1b1w > 2b0w` | 3 | **3556** | 1 | 34 | 56 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 1b1w > 2b1w` | 4 | **3466** | 1 | 45 | 36 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 1b1w > 2b2w` | 2 | **3663** | 1 | — | 36 | 1245 | — | 4 colours ruled out, 2 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b0w > 1b1w > 3b0w` | 2 | **3633** | 1 | 5 | 36 | 124 | 1=3 2=6 | 3 colours ruled out, 2 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `0b0w > 1b2w > 0b2w` | 6 | **1436** | 1 | 456 | 3 | 12 | 2=3 | 2 colours ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b2w > 0b3w` | 5 | **4535** | 1 | 6 | 345 | 12 | — | 2 colours ruled out, 3 confirmed in; no new colours; it works the known ones into new slots |
| `0b0w > 1b2w > 1b1w` | 6 | **3536** | 1 | 456 | 3 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b2w > 1b2w` | 5 | **4356** | 1 | 56 | 34 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 2 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 1b2w > 1b3w` | 2 | **4435** | 1 | — | 345 | 126 | 2=4 | 3 colours ruled out, 3 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 1b2w > 2b0w` | 6 | **3463** | 1 | 456 | 3 | 12 | 1=3 | 2 colours ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 1b2w > 2b1w` | 3 | **3564** | 1 | 6 | 345 | 12 | 4=4 | 2 colours ruled out, 3 confirmed in, 1 slot locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `0b0w > 1b2w > 3b0w` | 4 | **3456** | 1 | 56 | 34 | 12 | 1=3 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 2b0w > 0b0w` | 4 | **1444** | 1 | — | 45 | 1236 | 3=4 4=5 | 4 colours ruled out, 2 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 2b0w > 0b1w` | 4 | **6445** | 1 | 3456 | — | 12 | — | 2 colours ruled out; tests 3 of the 4 unresolved colours, rest goes on position |
| `0b0w > 2b0w > 0b2w` | 3 | **5365** | 1 | 45 | 36 | 12 | 2=3 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 2b0w > 1b0w` | 4 | **4645** | 1 | 3456 | — | 12 | — | 2 colours ruled out; tests 3 of the 4 unresolved colours, rest goes on position |
| `0b0w > 2b0w > 1b1w` | 3 | **3565** | 1 | 345 | 6 | 12 | — | 2 colours ruled out, 1 confirmed in; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 2b0w > 1b2w` | 2 | **3363** | 1 | 4 | 36 | 125 | 2=3 | 3 colours ruled out, 2 confirmed in, 1 slot locked; no new colours; it works the known ones into new slots |
| `0b0w > 2b0w > 2b0w` | 4 | **3446** | 1 | 456 | 3 | 12 | 1=3 | 2 colours ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b0w > 2b0w > 3b0w` | 2 | **3336** | 1 | 4 | 36 | 125 | 1=3 4=6 | 3 colours ruled out, 2 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `0b0w > 2b1w > 0b2w` | 4 | **4355** | 1 | 46 | 35 | 12 | 2=3 4=5 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 2b1w > 1b1w` | 4 | **3356** | 1 | 46 | 35 | 12 | — | 2 colours ruled out, 2 confirmed in; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 2b1w > 1b2w` | 3 | **3334** | 1 | 56 | 34 | 12 | 2=3 4=4 | 2 colours ruled out, 2 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `0b0w > 2b1w > 2b0w` | 4 | **3455** | 1 | 46 | 35 | 12 | 1=3 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 2b1w > 2b1w` | 2 | **3544** | 1 | 56 | 34 | 12 | 3=4 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 2b2w > 1b3w` | 2 | **3354** | 1 | — | 345 | 126 | 1=3 | 3 colours ruled out, 3 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 3b0w > 1b0w` | 2 | **3335** | 1 | — | 35 | 1246 | 1=3 2=3 4=5 | 4 colours ruled out, 2 confirmed in, 3 slots locked; colour question closed, so it only rearranges what it knows |
| `0b0w > 3b0w > 1b1w` | 2 | **3365** | 1 | 46 | 35 | 12 | 2=3 4=5 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b0w > 3b0w > 1b2w` | 2 | **4345** | 1 | 6 | 345 | 12 | 2=3 3=4 4=5 | 2 colours ruled out, 3 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `0b0w > 3b0w > 2b0w` | 2 | **3343** | 1 | 5 | 34 | 126 | 1=3 3=4 | 3 colours ruled out, 2 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `0b0w > 3b0w > 2b1w` | 2 | **3344** | 1 | 56 | 34 | 12 | 1=3 3=4 | 2 colours ruled out, 2 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `0b0w > 3b0w > 3b0w` | 2 | **3346** | 1 | 56 | 34 | 12 | 1=3 3=4 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 0b0w > 1b1w` | 2 | **5661** | 1 | — | 156 | 234 | 3=6 4=1 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b0w > 1b2w` | 2 | **5651** | 1 | — | 156 | 234 | 3=5 4=1 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b0w > 2b0w` | 3 | **1516** | 1 | — | 156 | 234 | 3=1 | 3 colours ruled out, 3 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b0w > 3b0w` | 3 | **1516** | 1 | — | 156 | 234 | 3=1 | 3 colours ruled out, 3 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b1w > 0b2w` | 6 | **6255** | 1 | 12456 | — | 3 | — | 1 colour ruled out; tests 3 of the 5 unresolved colours, rest goes on position |
| `0b1w > 0b1w > 0b3w` | 4 | **4651** | 1 | 345 | 16 | 2 | 4=1 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 0b1w > 1b1w` | 5 | **4551** | 1 | 1246 | 5 | 3 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 0b1w > 1b2w` | 7 | **1461** | 1 | 3456 | 1 | 2 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 0b1w > 1b3w` | 3 | **5613** | 1 | — | 1356 | 24 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b1w > 2b0w` | 3 | **4515** | 1 | 56 | 14 | 23 | 3=1 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 0b1w > 2b1w` | 5 | **3551** | 1 | 3456 | 1 | 2 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 0b1w > 2b2w` | 3 | **1113** | 1 | — | 1356 | 24 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b1w > 3b0w` | 4 | **1145** | 1 | 3456 | 1 | 2 | 3=1 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 0b2w > 0b0w` | 2 | **4416** | 1 | — | 146 | 235 | 1=4 2=4 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b2w > 0b1w` | 3 | **4613** | 1 | 356 | 14 | 2 | — | 1 colour ruled out, 2 confirmed in; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 0b2w > 0b2w` | 2 | **4513** | 1 | — | 1345 | 26 | 3=1 4=3 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b2w > 1b0w` | 6 | **3416** | 1 | 12356 | 4 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 0b2w > 1b1w` | 6 | **3413** | 1 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `0b1w > 0b2w > 1b2w` | 3 | **5263** | 1 | 6 | 235 | 14 | 2=2 4=3 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `0b1w > 0b2w > 2b0w` | 6 | **1336** | 1 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `0b1w > 0b2w > 2b1w` | 4 | **3256** | 1 | 5 | 236 | 14 | 2=2 | 2 colours ruled out, 3 confirmed in, 1 slot locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `0b1w > 0b2w > 2b2w` | 2 | **3253** | 1 | — | 235 | 146 | 2=2 4=3 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 0b2w > 3b0w` | 6 | **1536** | 1 | 56 | 23 | 14 | 2=2 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b0w > 0b1w` | 4 | **2566** | 1 | 1245 | 6 | 3 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b0w > 0b2w` | 3 | **5641** | 1 | 6 | 145 | 23 | 3=4 4=1 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `0b1w > 1b0w > 1b0w` | 5 | **6614** | 1 | 12456 | — | 3 | — | 1 colour ruled out; tests 3 of the 5 unresolved colours, rest goes on position |
| `0b1w > 1b0w > 1b1w` | 4 | **5614** | 1 | 3456 | 1 | 2 | — | 1 colour ruled out, 1 confirmed in; tests 3 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b0w > 1b2w` | 4 | **5361** | 1 | 56 | 13 | 24 | 2=3 4=1 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 2 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 1b0w > 2b1w` | 4 | **3331** | 1 | 56 | 13 | 24 | 2=3 | 2 colours ruled out, 2 confirmed in, 1 slot locked; no new colours; it works the known ones into new slots |
| `0b1w > 1b0w > 2b2w` | 2 | **3351** | 1 | — | 135 | 246 | 2=3 | 3 colours ruled out, 3 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 1b0w > 3b0w` | 4 | **3316** | 1 | 56 | 13 | 24 | 2=3 3=1 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 1b1w > 0b0w` | 3 | **2636** | 1 | — | 236 | 145 | 1=2 2=6 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 1b1w > 0b1w` | 4 | **2635** | 1 | 345 | 26 | 1 | — | 1 colour ruled out, 2 confirmed in; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 1b1w > 0b2w` | 7 | **2456** | 1 | 12356 | 4 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b1w > 1b0w` | 6 | **1635** | 1 | 3456 | 2 | 1 | — | 1 colour ruled out, 1 confirmed in; tests 3 of the 4 unresolved colours, rest goes on position |
| `0b1w > 1b1w > 1b1w` | 5 | **4361** | 1 | 12356 | 4 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b1w > 1b2w` | 4 | **1356** | 1 | 356 | 14 | 2 | 4=1 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 3 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b1w > 2b0w` | 3 | **3614** | 1 | 6 | 134 | 25 | 3=1 | 2 colours ruled out, 3 confirmed in, 1 slot locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `0b1w > 1b1w > 2b1w` | 2 | **4315** | 1 | 356 | 14 | 2 | 3=1 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 1b1w > 2b2w` | 2 | **4541** | 1 | — | 145 | 236 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `0b1w > 1b1w > 3b0w` | 3 | **4414** | 1 | 356 | 14 | 2 | 3=1 4=4 | 1 colour ruled out, 2 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `0b1w > 1b2w > 0b3w` | 3 | **2436** | 1 | 6 | 234 | 15 | 1=2 2=4 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `0b1w > 1b2w > 1b1w` | 2 | **3414** | 1 | 1236 | 4 | 5 | 4=4 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b2w > 1b2w` | 2 | **4254** | 1 | 356 | 24 | 1 | 2=2 4=4 | 1 colour ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 1b2w > 1b3w` | 2 | **2435** | 1 | — | 2345 | 16 | 3=3 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 1b2w > 2b0w` | 2 | **3441** | 1 | 1236 | 4 | 5 | 3=4 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 1b2w > 2b1w` | 3 | **3234** | 1 | 6 | 234 | 15 | 2=2 | 2 colours ruled out, 3 confirmed in, 1 slot locked; no new colours; it works the known ones into new slots |
| `0b1w > 1b2w > 2b2w` | 2 | **3254** | 1 | — | 2345 | 16 | 2=2 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 1b2w > 3b0w` | 3 | **3243** | 1 | 356 | 24 | 1 | 2=2 3=4 | 1 colour ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 2b0w > 0b0w` | 4 | **1136** | 1 | 6 | 23 | 145 | 1=2 2=3 | 3 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 1 confirmed, rest goes on position |
| `0b1w > 2b0w > 0b1w` | 3 | **2353** | 1 | 3456 | 2 | 1 | 1=2 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 2b0w > 0b2w` | 3 | **2654** | 1 | 12356 | 4 | — | 4=4 | 1 confirmed in, 1 slot locked; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 2b0w > 1b0w` | 3 | **2335** | 1 | 3456 | 2 | 1 | 1=2 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b1w > 2b0w > 1b1w` | 4 | **2564** | 1 | 123456 | — | — | — | nothing settled yet; tests 4 of the 6 unresolved colours, rest goes on position |
| `0b1w > 2b0w > 1b2w` | 2 | **2554** | 1 | 123 | 45 | 6 | — | 1 colour ruled out, 2 confirmed in; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b1w > 2b0w > 2b0w` | 2 | **2546** | 1 | — | 2456 | 13 | 1=2 3=4 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 2b1w > 0b1w` | 2 | **4314** | 1 | — | 134 | 256 | 1=4 2=3 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 2b1w > 0b2w` | 2 | **4244** | 1 | 6 | 24 | 135 | 2=2 3=4 4=4 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `0b1w > 2b1w > 1b1w` | 2 | **2634** | 1 | — | 2346 | 15 | 1=2 2=6 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 2b1w > 1b2w` | 2 | **2534** | 1 | — | 2345 | 16 | 1=2 2=5 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 2b1w > 2b0w` | 2 | **2446** | 1 | — | 246 | 135 | 1=2 2=4 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 3b0w > 0b0w` | 2 | **2444** | 1 | 6 | 24 | 135 | 1=2 3=4 4=4 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `0b1w > 3b0w > 1b0w` | 2 | **2346** | 1 | — | 2346 | 15 | 1=2 2=3 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b1w > 3b0w > 1b1w` | 2 | **2343** | 1 | 5 | 234 | 16 | 1=2 2=3 | 2 colours ruled out, 3 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `0b1w > 3b0w > 2b0w` | 2 | **2334** | 1 | 5 | 234 | 16 | 1=2 2=3 | 2 colours ruled out, 3 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `0b2w > 0b1w > 1b0w` | 3 | **3611** | 1 | 34 | 16 | 25 | 3=1 4=1 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 0b1w > 1b1w` | 3 | **3511** | 1 | 23456 | 1 | — | 4=1 | 1 confirmed in, 1 slot locked; tests 2 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b2w > 0b1w > 2b0w` | 2 | **5411** | 1 | 2456 | 1 | 3 | 3=1 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b2w > 0b1w > 3b0w` | 2 | **5216** | 1 | — | 1256 | 34 | 2=2 3=1 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b2w > 0b2w > 1b2w` | 2 | **4251** | 1 | 3456 | 12 | — | 2=2 4=1 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 0b2w > 2b0w` | 2 | **3411** | 1 | 236 | 14 | 5 | 3=1 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 0b2w > 2b1w` | 3 | **3231** | 1 | 6 | 123 | 45 | 2=2 | 2 colours ruled out, 3 confirmed in, 1 slot locked; no new colours; it works the known ones into new slots |
| `0b2w > 0b2w > 2b2w` | 2 | **3251** | 1 | — | 1235 | 46 | 2=2 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b2w > 0b2w > 3b0w` | 3 | **3213** | 1 | 3456 | 12 | — | 2=2 3=1 | 2 confirmed in, 2 slots locked; tests 1 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 1b0w > 0b1w` | 2 | **5311** | 1 | 56 | 13 | 24 | 2=3 3=1 4=1 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 1b0w > 1b1w` | 2 | **2515** | 1 | 56 | 12 | 34 | 1=2 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 1b0w > 1b2w` | 2 | **2561** | 1 | — | 1256 | 34 | 1=2 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b2w > 1b0w > 2b0w` | 2 | **2551** | 1 | 56 | 12 | 34 | 1=2 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 1b0w > 2b1w` | 2 | **2516** | 1 | — | 1256 | 34 | 1=2 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `0b2w > 1b0w > 3b0w` | 2 | **2255** | 1 | 56 | 2 | 134 | 1=2 2=2 | 3 colours ruled out, 1 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b2w > 1b1w > 1b0w` | 3 | **2236** | 1 | 6 | 23 | 145 | 1=2 2=2 | 3 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 2 confirmed, rest goes on position |
| `0b2w > 1b1w > 1b1w` | 3 | **2253** | 1 | 12456 | 3 | — | — | 1 confirmed in; tests 2 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `0b2w > 1b1w > 1b2w` | 2 | **2531** | 1 | 3456 | 12 | — | — | 2 confirmed in; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 1b1w > 2b0w` | 2 | **2235** | 1 | 156 | 23 | 4 | 1=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 1b1w > 2b1w` | 2 | **2461** | 1 | 3456 | 12 | — | 1=2 | 2 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 2b0w > 0b0w` | 2 | **2246** | 1 | — | 246 | 135 | 1=2 2=2 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `0b2w > 2b0w > 0b1w` | 2 | **2254** | 1 | 156 | 24 | 3 | 1=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 2b0w > 1b0w` | 2 | **2245** | 1 | 156 | 24 | 3 | 1=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 2b0w > 1b1w` | 2 | **2361** | 1 | 3456 | 12 | — | 1=2 | 2 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `0b2w > 2b0w > 1b2w` | 2 | **2331** | 1 | 5 | 123 | 46 | 1=2 2=3 4=1 | 2 colours ruled out, 3 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b0w > 0b0w > 1b1w` | 2 | **5662** | 1 | — | 256 | 134 | 3=6 4=2 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b0w > 1b2w` | 2 | **5652** | 1 | — | 256 | 134 | 3=5 4=2 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b0w > 2b0w` | 3 | **1516** | 1 | — | 256 | 134 | 3=2 | 3 colours ruled out, 3 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b0w > 3b0w` | 3 | **1516** | 1 | — | 256 | 134 | 3=2 | 3 colours ruled out, 3 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b1w > 0b2w` | 6 | **6155** | 1 | 12456 | — | 3 | — | 1 colour ruled out; tests 3 of the 5 unresolved colours, rest goes on position |
| `1b0w > 0b1w > 0b3w` | 4 | **4652** | 1 | 345 | 26 | 1 | 4=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 0b1w > 1b1w` | 5 | **4552** | 1 | 1246 | 5 | 3 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 0b1w > 1b2w` | 7 | **1462** | 1 | 3456 | 2 | 1 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 0b1w > 1b3w` | 3 | **5623** | 1 | — | 2356 | 14 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b1w > 2b0w` | 3 | **4525** | 1 | 56 | 24 | 13 | 3=2 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 0b1w > 2b1w` | 5 | **3552** | 1 | 3456 | 2 | 1 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 0b1w > 2b2w` | 3 | **1123** | 1 | — | 2356 | 14 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b1w > 3b0w` | 4 | **1145** | 1 | 3456 | 2 | 1 | 3=2 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, rest goes on position |
| `1b0w > 0b2w > 0b0w` | 2 | **4426** | 1 | — | 246 | 135 | 1=4 2=4 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b2w > 0b1w` | 3 | **4623** | 1 | 356 | 24 | 1 | — | 1 colour ruled out, 2 confirmed in; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 0b2w > 0b2w` | 2 | **4523** | 1 | — | 2345 | 16 | 3=2 4=3 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b2w > 1b0w` | 6 | **3426** | 1 | 12356 | 4 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 0b2w > 1b1w` | 6 | **3423** | 1 | 123456 | — | — | — | nothing settled yet; tests 3 of the 6 unresolved colours, rest goes on position |
| `1b0w > 0b2w > 1b2w` | 3 | **5163** | 1 | 6 | 135 | 24 | 2=1 4=3 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `1b0w > 0b2w > 2b0w` | 6 | **1436** | 1 | 123456 | — | — | — | nothing settled yet; tests 4 of the 6 unresolved colours, rest goes on position |
| `1b0w > 0b2w > 2b1w` | 4 | **3156** | 1 | 5 | 136 | 24 | 2=1 | 2 colours ruled out, 3 confirmed in, 1 slot locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `1b0w > 0b2w > 2b2w` | 2 | **3153** | 1 | — | 135 | 246 | 2=1 4=3 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 0b2w > 3b0w` | 6 | **1536** | 1 | 56 | 13 | 24 | 2=1 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 1b0w > 0b1w` | 4 | **1566** | 1 | 1245 | 6 | 3 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b0w > 0b2w` | 3 | **5642** | 1 | 6 | 245 | 13 | 3=4 4=2 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `1b0w > 1b0w > 1b0w` | 5 | **6624** | 1 | 12456 | — | 3 | — | 1 colour ruled out; tests 3 of the 5 unresolved colours, rest goes on position |
| `1b0w > 1b0w > 1b1w` | 4 | **5624** | 1 | 3456 | 2 | 1 | — | 1 colour ruled out, 1 confirmed in; tests 3 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b0w > 1b2w` | 4 | **5362** | 1 | 56 | 23 | 14 | 2=3 4=2 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 2 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 1b0w > 2b1w` | 4 | **3332** | 1 | 56 | 23 | 14 | 2=3 | 2 colours ruled out, 2 confirmed in, 1 slot locked; no new colours; it works the known ones into new slots |
| `1b0w > 1b0w > 2b2w` | 2 | **3352** | 1 | — | 235 | 146 | 2=3 | 3 colours ruled out, 3 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 1b0w > 3b0w` | 4 | **3326** | 1 | 56 | 23 | 14 | 2=3 3=2 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 1b1w > 0b0w` | 3 | **1636** | 1 | — | 136 | 245 | 1=1 2=6 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 1b1w > 0b1w` | 4 | **1635** | 1 | 345 | 16 | 2 | — | 1 colour ruled out, 2 confirmed in; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 1b1w > 0b2w` | 7 | **1456** | 1 | 12356 | 4 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b1w > 1b0w` | 6 | **1336** | 1 | 3456 | 1 | 2 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b1w > 1b1w` | 5 | **4362** | 1 | 12356 | 4 | — | — | 1 confirmed in; tests 3 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b1w > 1b2w` | 4 | **1356** | 1 | 356 | 24 | 1 | 4=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 3 of the 3 unresolved colours, rest goes on position |
| `1b0w > 1b1w > 2b0w` | 3 | **3624** | 1 | 6 | 234 | 15 | 3=2 | 2 colours ruled out, 3 confirmed in, 1 slot locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `1b0w > 1b1w > 2b1w` | 2 | **4325** | 1 | 356 | 24 | 1 | 3=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 1b1w > 2b2w` | 2 | **4542** | 1 | — | 245 | 136 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b0w > 1b1w > 3b0w` | 3 | **4424** | 1 | 356 | 24 | 1 | 3=2 4=4 | 1 colour ruled out, 2 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `1b0w > 1b2w > 0b3w` | 3 | **1436** | 1 | 6 | 134 | 25 | 1=1 2=4 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `1b0w > 1b2w > 1b1w` | 2 | **3424** | 1 | 1236 | 4 | 5 | 4=4 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b2w > 1b2w` | 2 | **4154** | 1 | 356 | 14 | 2 | 2=1 4=4 | 1 colour ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 1b2w > 1b3w` | 2 | **1435** | 1 | — | 1345 | 26 | 3=3 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 1b2w > 2b0w` | 2 | **3442** | 1 | 1236 | 4 | 5 | 3=4 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 1b2w > 2b1w` | 3 | **3134** | 1 | 6 | 134 | 25 | 2=1 | 2 colours ruled out, 3 confirmed in, 1 slot locked; no new colours; it works the known ones into new slots |
| `1b0w > 1b2w > 2b2w` | 2 | **3154** | 1 | — | 1345 | 26 | 2=1 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 1b2w > 3b0w` | 3 | **3143** | 1 | 356 | 14 | 2 | 2=1 3=4 | 1 colour ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b0w > 2b0w > 0b1w` | 4 | **3324** | 1 | 6 | 234 | 15 | 2=3 | 2 colours ruled out, 3 confirmed in, 1 slot locked; no new colours; it works the known ones into new slots |
| `1b0w > 2b0w > 0b2w` | 2 | **5324** | 1 | — | 2345 | 16 | 1=5 2=3 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 2b0w > 1b0w` | 4 | **1136** | 1 | 6 | 13 | 245 | 1=1 2=3 | 3 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 2 confirmed, rest goes on position |
| `1b0w > 2b0w > 1b1w` | 4 | **1356** | 1 | 3456 | 1 | 2 | 1=1 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 3 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b0w > 2b0w > 1b2w` | 4 | **1546** | 1 | 6 | 145 | 23 | 1=1 | 2 colours ruled out, 3 confirmed in, 1 slot locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `1b0w > 2b0w > 2b0w` | 3 | **1136** | 1 | 6 | 135 | 24 | 1=1 2=3 4=5 | 2 colours ruled out, 3 confirmed in, 3 slots locked; tests 1 of the 1 unresolved colour, keeps 2 confirmed, rest goes on position |
| `1b0w > 2b0w > 2b1w` | 2 | **1545** | 1 | 6 | 145 | 23 | 1=1 3=4 4=5 | 2 colours ruled out, 3 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b0w > 2b1w > 0b1w` | 2 | **4324** | 1 | — | 234 | 156 | 1=4 2=3 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 2b1w > 0b2w` | 2 | **4144** | 1 | 6 | 14 | 235 | 2=1 3=4 4=4 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b0w > 2b1w > 1b1w` | 2 | **1634** | 1 | — | 1346 | 25 | 1=1 2=6 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 2b1w > 1b2w` | 2 | **1534** | 1 | — | 1345 | 26 | 1=1 2=5 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 2b1w > 2b0w` | 2 | **1446** | 1 | — | 146 | 235 | 1=1 2=4 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 3b0w > 1b0w` | 2 | **1444** | 1 | 6 | 14 | 235 | 1=1 3=4 4=4 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b0w > 3b0w > 2b0w` | 2 | **1346** | 1 | — | 1346 | 25 | 1=1 2=3 | 2 colours ruled out, 4 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b0w > 3b0w > 2b1w` | 2 | **1343** | 1 | 5 | 134 | 26 | 1=1 2=3 | 2 colours ruled out, 3 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `1b0w > 3b0w > 3b0w` | 2 | **1334** | 1 | 5 | 134 | 26 | 1=1 2=3 | 2 colours ruled out, 3 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 0b0w > 0b3w` | 2 | **5262** | 1 | — | 256 | 134 | 2=2 4=2 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b0w > 1b1w` | 3 | **2262** | 1 | — | 26 | 1345 | — | 4 colours ruled out, 2 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b0w > 1b2w` | 3 | **2252** | 1 | 6 | 25 | 134 | — | 3 colours ruled out, 2 confirmed in; no new colours; it works the known ones into new slots |
| `1b1w > 0b0w > 2b0w` | 2 | **2226** | 1 | — | 26 | 1345 | 1=2 3=2 4=6 | 4 colours ruled out, 2 confirmed in, 3 slots locked; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b0w > 2b1w` | 2 | **2562** | 1 | — | 256 | 134 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b0w > 2b2w` | 2 | **2552** | 1 | — | 25 | 1346 | — | 4 colours ruled out, 2 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b0w > 3b0w` | 3 | **2225** | 1 | 6 | 25 | 134 | 1=2 3=2 | 3 colours ruled out, 2 confirmed in, 2 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 0b1w > 0b2w` | 4 | **5621** | 1 | 1456 | 2 | 3 | 3=2 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 3 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b1w > 0b3w` | 4 | **3226** | 1 | 3456 | 2 | 1 | 2=2 3=2 | 1 colour ruled out, 1 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b1w > 0b4w` | 2 | **3225** | 1 | — | 235 | 146 | 2=2 3=2 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b1w > 1b1w` | 7 | **6242** | 1 | 1456 | 2 | 3 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b1w > 1b2w` | 5 | **2223** | 1 | 3456 | 2 | 1 | — | 1 colour ruled out, 1 confirmed in; tests 1 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b1w > 2b0w` | 4 | **2462** | 1 | 6 | 24 | 135 | 1=2 4=2 | 3 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 2 confirmed, rest goes on position |
| `1b1w > 0b1w > 2b1w` | 4 | **2323** | 1 | 3456 | 2 | 1 | — | 1 colour ruled out, 1 confirmed in; tests 1 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b1w > 2b2w` | 2 | **2325** | 1 | — | 235 | 146 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b1w > 3b0w` | 2 | **2362** | 1 | 3456 | 2 | 1 | 1=2 4=2 | 1 colour ruled out, 1 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 0b2w > 0b2w` | 4 | **4612** | 1 | 136 | 24 | 5 | 4=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 2 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 0b2w > 0b3w` | 2 | **5412** | 1 | 3456 | 12 | — | 3=1 4=2 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 0b2w > 1b1w` | 3 | **2423** | 1 | — | 234 | 156 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b2w > 1b2w` | 3 | **3312** | 1 | 3456 | 12 | — | 3=1 4=2 | 2 confirmed in, 2 slots locked; tests 1 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 0b2w > 2b0w` | 3 | **4621** | 1 | 6 | 124 | 35 | 3=2 4=1 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `1b1w > 0b2w > 2b1w` | 2 | **5421** | 1 | 3456 | 12 | — | 3=2 4=1 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 0b2w > 2b2w` | 2 | **3512** | 1 | — | 1235 | 46 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 0b2w > 3b0w` | 3 | **3321** | 1 | 3456 | 12 | — | 3=2 4=1 | 2 confirmed in, 2 slots locked; tests 1 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 1b0w > 0b1w` | 2 | **2332** | 1 | 34 | 2 | 156 | 1=2 | 3 colours ruled out, 1 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b0w > 0b2w` | 4 | **2524** | 1 | 3456 | 2 | 1 | 1=2 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b0w > 1b0w` | 4 | **2224** | 1 | 34 | 2 | 156 | 2=2 | 3 colours ruled out, 1 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b0w > 1b1w` | 4 | **5224** | 1 | 3456 | 2 | 1 | 2=2 | 1 colour ruled out, 1 confirmed in, 1 slot locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b0w > 1b2w` | 2 | **2155** | 1 | 56 | 12 | 34 | 1=2 2=1 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 1b0w > 2b2w` | 2 | **1265** | 1 | — | 1256 | 34 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 1b0w > 3b0w` | 2 | **1255** | 1 | 56 | 12 | 34 | 1=1 2=2 | 2 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 1b1w > 0b0w` | 4 | **2324** | 1 | — | 234 | 156 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 1b1w > 0b2w` | 3 | **2145** | 1 | 3456 | 12 | — | 1=2 2=1 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 1b1w > 0b3w` | 2 | **5151** | 1 | 56 | 1 | 234 | 2=1 4=1 | 3 colours ruled out, 1 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b1w > 0b4w` | 2 | **5161** | 1 | — | 156 | 234 | 2=1 4=1 | 3 colours ruled out, 3 confirmed in, 2 slots locked; colour question closed, so it only rearranges what it knows |
| `1b1w > 1b1w > 1b1w` | 4 | **1245** | 1 | 3456 | 12 | — | — | 2 confirmed in; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 1b1w > 1b2w` | 4 | **1661** | 1 | 56 | 1 | 234 | — | 3 colours ruled out, 1 confirmed in; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b1w > 1b3w` | 2 | **1651** | 1 | — | 156 | 234 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 1b1w > 2b1w` | 3 | **1551** | 1 | 56 | 1 | 234 | — | 3 colours ruled out, 1 confirmed in; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b1w > 2b2w` | 3 | **1561** | 1 | — | 156 | 234 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 1b1w > 3b0w` | 3 | **1511** | 1 | 56 | 1 | 234 | 1=1 3=1 | 3 colours ruled out, 1 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b2w > 0b2w` | 4 | **4161** | 1 | 236 | 14 | 5 | 2=1 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 1b2w > 0b3w` | 3 | **4151** | 1 | 3456 | 1 | 2 | 2=1 4=1 | 1 colour ruled out, 1 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b2w > 1b1w` | 6 | **1461** | 1 | 236 | 14 | 5 | — | 1 colour ruled out, 2 confirmed in; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b1w > 1b2w > 1b2w` | 6 | **6451** | 1 | 3456 | 1 | 2 | — | 1 colour ruled out, 1 confirmed in; tests 3 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b2w > 2b0w` | 2 | **1411** | 1 | 6 | 14 | 235 | 1=1 2=4 3=1 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 1b2w > 2b1w` | 3 | **1361** | 1 | 3456 | 1 | 2 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 1b2w > 2b2w` | 3 | **1351** | 1 | — | 135 | 246 | — | 3 colours ruled out, 3 confirmed in; colour question closed, so it only rearranges what it knows |
| `1b1w > 1b2w > 3b0w` | 4 | **1113** | 1 | 3456 | 1 | 2 | 1=1 3=1 | 1 colour ruled out, 1 confirmed in, 2 slots locked; tests 1 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 2b0w > 0b2w` | 2 | **2144** | 1 | 6 | 124 | 35 | 1=2 2=1 4=4 | 2 colours ruled out, 3 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 2b0w > 1b2w` | 2 | **2133** | 1 | 6 | 123 | 45 | 1=2 2=1 3=3 | 2 colours ruled out, 3 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 2b0w > 2b0w` | 2 | **1244** | 1 | 6 | 124 | 35 | 1=1 2=2 4=4 | 2 colours ruled out, 3 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 2b0w > 3b0w` | 2 | **1233** | 1 | 6 | 123 | 45 | 1=1 2=2 3=3 | 2 colours ruled out, 3 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 2b1w > 0b3w` | 2 | **3131** | 1 | 6 | 13 | 245 | 2=1 3=3 4=1 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 2b1w > 1b1w` | 2 | **4114** | 1 | 6 | 14 | 235 | 2=1 3=1 4=4 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 2b1w > 1b2w` | 2 | **1631** | 1 | 3456 | 1 | 2 | — | 1 colour ruled out, 1 confirmed in; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b1w > 2b1w > 2b0w` | 2 | **1414** | 1 | 6 | 14 | 235 | 1=1 3=1 4=4 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b1w > 2b1w > 2b1w` | 2 | **1331** | 1 | 345 | 1 | 26 | 1=1 | 2 colours ruled out, 1 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 1 confirmed, rest goes on position |
| `1b2w > 1b1w > 0b3w` | 2 | **5221** | 1 | 56 | 12 | 34 | 2=2 3=2 4=1 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b2w > 1b1w > 3b0w` | 2 | **2512** | 1 | 56 | 12 | 34 | 1=2 3=1 4=2 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b2w > 1b2w > 2b0w` | 2 | **2115** | 1 | 56 | 12 | 34 | 1=2 2=1 3=1 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b2w > 2b0w > 0b1w` | 2 | **2212** | 1 | 6 | 12 | 345 | 2=2 3=1 4=2 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `1b2w > 2b0w > 0b2w` | 2 | **4212** | 1 | 45 | 12 | 36 | 2=2 3=1 4=2 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `1b2w > 3b0w > 2b0w` | 2 | **1215** | 1 | 56 | 12 | 34 | 1=1 2=2 3=1 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 0b2w > 0b3w` | 3 | **5162** | 1 | 6 | 125 | 34 | 2=1 4=2 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `2b0w > 0b2w > 1b0w` | 4 | **4622** | 1 | 6 | 24 | 135 | 3=2 4=2 | 3 colours ruled out, 2 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 2 confirmed, rest goes on position |
| `2b0w > 0b2w > 1b1w` | 4 | **4522** | 1 | 13456 | 2 | — | 3=2 | 1 confirmed in, 1 slot locked; tests 2 of the 5 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 0b2w > 1b2w` | 2 | **3522** | 1 | 136 | 25 | 4 | 3=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 0b2w > 2b0w` | 3 | **2116** | 1 | 6 | 23 | 145 | 2=3 3=2 4=2 | 3 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 1 unresolved colour, keeps 1 confirmed, rest goes on position |
| `2b0w > 0b2w > 2b1w` | 3 | **5125** | 1 | 136 | 25 | 4 | 3=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 0b3w > 0b2w` | 3 | **4162** | 1 | 6 | 124 | 35 | 2=1 4=2 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `2b0w > 0b3w > 0b3w` | 3 | **4152** | 1 | 3456 | 12 | — | 2=1 4=2 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 0b3w > 1b1w` | 2 | **3422** | 1 | 136 | 24 | 5 | 3=2 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 0b3w > 1b2w` | 3 | **3126** | 1 | 6 | 123 | 45 | 2=1 3=2 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `2b0w > 1b0w > 0b0w` | 2 | **2222** | 1 | 6 | 2 | 1345 | 2=2 3=2 4=2 | 4 colours ruled out, 1 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `2b0w > 1b0w > 1b1w` | 2 | **1161** | 1 | — | 16 | 2345 | 1=1 2=1 3=6 | 4 colours ruled out, 2 confirmed in, 3 slots locked; colour question closed, so it only rearranges what it knows |
| `2b0w > 1b0w > 1b2w` | 2 | **1151** | 1 | 6 | 15 | 234 | 1=1 2=1 3=5 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `2b0w > 1b0w > 2b0w` | 2 | **1111** | 1 | 6 | 1 | 2345 | 1=1 2=1 3=1 | 4 colours ruled out, 1 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `2b0w > 1b0w > 2b1w` | 2 | **1155** | 1 | 6 | 15 | 234 | 1=1 2=1 4=5 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `2b0w > 1b1w > 0b1w` | 2 | **3222** | 1 | 34 | 2 | 156 | 2=2 3=2 4=2 | 3 colours ruled out, 1 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 1b1w > 0b3w` | 2 | **1525** | 1 | 56 | 12 | 34 | 1=1 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 1b1w > 0b4w` | 2 | **1562** | 1 | — | 1256 | 34 | 1=1 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `2b0w > 1b1w > 1b0w` | 2 | **1113** | 1 | 34 | 1 | 256 | 1=1 2=1 | 3 colours ruled out, 1 confirmed in, 2 slots locked; tests 1 of the 2 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 1b1w > 1b1w` | 2 | **1145** | 1 | 3456 | 1 | 2 | 1=1 2=1 | 1 colour ruled out, 1 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 1b1w > 1b2w` | 2 | **1552** | 1 | 56 | 12 | 34 | 1=1 | 2 colours ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 1b1w > 1b3w` | 2 | **1526** | 1 | — | 1256 | 34 | 1=1 | 2 colours ruled out, 4 confirmed in, 1 slot locked; colour question closed, so it only rearranges what it knows |
| `2b0w > 1b1w > 2b0w` | 2 | **1146** | 1 | 3456 | 1 | 2 | 1=1 2=1 | 1 colour ruled out, 1 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 1 confirmed, rest goes on position |
| `2b0w > 1b2w > 0b2w` | 2 | **4124** | 1 | 6 | 124 | 35 | 2=1 3=2 4=4 | 2 colours ruled out, 3 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `2b0w > 1b2w > 1b1w` | 2 | **1143** | 1 | 236 | 14 | 5 | 1=1 | 1 colour ruled out, 2 confirmed in, 1 slot locked; tests 1 of the 3 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 1b2w > 1b2w` | 4 | **1623** | 1 | 3456 | 12 | — | — | 2 confirmed in; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 1b2w > 1b3w` | 2 | **1523** | 1 | — | 1235 | 46 | — | 2 colours ruled out, 4 confirmed in; colour question closed, so it only rearranges what it knows |
| `2b0w > 1b2w > 2b0w` | 3 | **1462** | 1 | 6 | 124 | 35 | 1=1 4=2 | 2 colours ruled out, 3 confirmed in, 2 slots locked; tests 1 of the 1 unresolved colour, keeps 3 confirmed, rest goes on position |
| `2b0w > 1b2w > 2b1w` | 3 | **1323** | 1 | 3456 | 12 | — | 1=1 | 2 confirmed in, 1 slot locked; tests 1 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 1b2w > 3b0w` | 2 | **1362** | 1 | 3456 | 12 | — | 1=1 4=2 | 2 confirmed in, 2 slots locked; tests 2 of the 4 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 2b0w > 1b0w` | 2 | **1114** | 1 | — | 14 | 2356 | 1=1 2=1 4=4 | 4 colours ruled out, 2 confirmed in, 3 slots locked; colour question closed, so it only rearranges what it knows |
| `2b0w > 2b0w > 1b1w` | 2 | **1154** | 1 | 56 | 14 | 23 | 1=1 2=1 4=4 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `2b0w > 2b0w > 2b0w` | 2 | **1131** | 1 | — | 13 | 2456 | 1=1 2=1 3=3 | 4 colours ruled out, 2 confirmed in, 3 slots locked; colour question closed, so it only rearranges what it knows |
| `3b0w > 1b1w > 2b0w` | 2 | **1152** | 1 | 56 | 12 | 34 | 1=1 2=1 4=2 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `3b0w > 1b2w > 1b0w` | 2 | **2122** | 1 | 6 | 12 | 345 | 2=1 3=2 4=2 | 3 colours ruled out, 2 confirmed in, 3 slots locked; no new colours; it works the known ones into new slots |
| `3b0w > 1b2w > 1b1w` | 2 | **4122** | 1 | 45 | 12 | 36 | 2=1 3=2 4=2 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
| `3b0w > 2b0w > 2b0w` | 2 | **1125** | 1 | 56 | 12 | 34 | 1=1 2=1 3=2 | 2 colours ruled out, 2 confirmed in, 3 slots locked; tests 1 of the 2 unresolved colours, keeps 2 confirmed, rest goes on position |
