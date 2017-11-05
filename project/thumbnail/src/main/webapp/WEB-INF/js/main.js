var xmlHttp;
var xmlHttpSearch;
var xmlHttpComment;
var http_request = false;
var vLink;
var poster;
var video_Id;
var searchText;//write to search results:eg:3 results for "word"
//var allVideos = new Array(); //Modified by Jiang Tao 20140526
var searchCommentType;
var startPlayPoint=-1;

ocr = {"30":"Data Science @ Stanford  presents  David Lobell, PhD     Introduction by Sharat lsrani, PhD  January 20,2016  ",    "11130":"A typicalfuture data science problem  - Here are 10 million histories of poverty levels and various family attributes and interventions. Predict the intervention that will most effectively reduce poverty.  ", "12180":"A typicalfuture data science problem  - Here are 10 million histories of poverty levels and various family attributes and interventions. Predict the intervention that will most effectively reduce poverty.  - Here are 1 million histories of crop yields and various soil, management, and weather conditions. Predict which management practices will most raise yields and minimize inputs. Or predict who is most worthy of insurance, and when to trigger payments.  ", "13110":"A typicalfuture data science problem  - Here are 10 million histories of poverty levels and various family attributes and interventions. Predict the intervention that will most effectively reduce poverty.  - Here are 1 million histories of crop yields and various soil, management, and weather conditions. Predict which management practices will most raise yields and minimize inputs. Or predict who is most worthy of insurance, and when to trigger payments.  - But there's a slight problem...  ",  "15450":"2 critical steps to achieve the vision  1. Quickly scale up the amount of data we have to work with  2. Proceed to analysis and insight (mostly by copying all the successful techniques in commerce, medicine, education, sports, etc.)  ", "17370":"How to generate relevant data?  - There are lots of cheap data streams that should contain some information on the state of people and their plants  ", "17670":"Mobile phones     Population density in France based on phone records (hnp://www.wor|dpop.org.uk/)  ", "18240":"Mobile phones  Population density in France based on phone records (http://www.wo?dpop.org.uk/)     ", "18690":"Mobile phones     ", "18990":"Mobile phones  Population density in France based on phone records (httu://www.wnr1dpop.org.uk/)     ", "19200":"Mobile phones  Anunuxlowom  Population density in France based on phone records (http://www.wor1dpop.or3.uk/)     ",  "22170":"Plane?ahs Imge, Uga_nda     ",  "27240":"   ", "27810":"   ",    "39300":"   ", "40680":"   ", "40830":"Comparison with county averages  umuy-dd--v-9-mu-zuuym-an sayy-ounww-uownuuzu-urn  mu Nksamm  ", "42630":"   E H. 3 m e an a r e v A  ", "45240":"One insight from this new dataset  Yield trends in U.S. maize appear largely driven by gains on good soils  2013  ?elds a lot higher on better soils circa 2013  Vields a little higher on better soils circa 2000  Image Vnld um.)     ",    "50850":"Focus on Poverty  First step: infer household income and poverty from satellite imagery  Example: vs.       Do this at scale, accurately and with unprecedented spatial resolution  ",    "54060":"Transfer Learning Approach     ", "55140":"Transfer Learning Approach  Our approach: predict nighttime light intensity from daytime images  Low , nighttime  light intensity  High r nighttime light intensity       Locations of sampled images  Data-rich proxy: essentially unlimited amount of labeled training data available  Goal: store knowledge that can be useful for the poverty task (eg., how to identify man-made structures)  ",  "56790":"Transfer Learning Approach  Our approach: predict nighttime light intensity from daytime images Low , nighttime light intensity  High - nighttime light intensity       Locations of sampled images  Data-rich proxy: essentially unlimited amount of labeled training data available  Goal: store knowledge that can be useful for the poverty task (e.g., how to identify man-made structures)  ",  "56850":"Learned Features: Roads     Z5 Maximally activating images  No superv' ' beyond nighttime Ii - no labeled example 0 in It a road looks like in rovided!  -a :8  ", "57030":"Learned Features: Roads  25 Maxlmally activating images  Na superv '  example 0 w  bey at a  nigh '  look  Corresponding filter activation map  2 lights < no labeled ' 2 was provided!  ", "59340":"Poverty Estimation  - Start with Living Standards Measurement Survey (LSMS) data in Uganda (World Bank):  - 700 data points (enumeration areas) - Expenditures, above/below poverty line, coordinates  - Task: predict if the majority of households in an enumeration area are above or below the poverty line (from corresponding images)  Ynnsf Survey Lights Accuracy 0.71 0.75 0.53 Precision 0.39 0.45 0.30     AUC 0.76 0.78 0.72  ",  "62850":"Poverty Estimation  - Start with Living Standards Measurement Survey (LSMS) data in Uganda (World Bank):  - 700 data points (enumeration areas) - Expenditures, above/below poverty line, coordinates  - Task: predict if the majority of households in an enumeration area are above or below the poverty line (from corresponding images)  Accuracy 0.71 0.75 0.53 Precision 0.39 0.45 0.30 AUC 0.76 0.78 0.72     ", "63330":"Poverty Estimation  - Test of predictions of household assets across many countries  Cross-Border Model Generalization       ", "64350":"Poverty Estimation  - Test of predictions of household assets across many countries  Cross-Border Model Generalization  luau-mnuuu-u 1u9anIa than jun-nu jut:-u jaw:       "}

sbd_arr = [1, 11, 204, 220, 287, 313, 338, 371, 383, 406, 429, 437, 457, 491, 515, 534, 579, 589, 608, 623, 633, 640, 652, 700, 717, 739, 763, 801, 858, 908, 922, 927, 936, 982, 1069, 1134, 1162, 1177, 1310, 1344, 1356, 1361, 1396, 1421, 1450, 1508, 1572, 1587, 1605, 1626, 1649, 1681, 1695, 1725, 1738, 1766, 1790, 1802, 1818, 1838, 1858, 1869, 1881, 1893, 1894, 1895, 1901, 1978, 2016, 2079, 2095, 2111, 2112, 2145, 2167, 2181, 2224, 2254, 2337, 2350, 2377, 2388, 2429, 2460, 2464, 2477, 3318, 3426,3428]
slide_arr = [204,313,371,457,515,579,589,700,739,801,908,927,936,1069,1310,1356,1361,1421,1508,1626,1649,1695,1725,1802,1838,1869,1895,1978,2079,2095,2111,2254,2350,2388];
slide_arr = [204, 287, 313, 371, 406, 437, 457, 515, 579, 589, 608, 623, 633, 640, 700, 739, 801, 908, 927, 936, 1069, 1162, 1310, 1356, 1361, 1421, 1508, 1587, 1626, 1649, 1695, 1725, 1738, 1790, 1802, 1838, 1869, 1893, 1894, 1895, 1901, 1978, 2079, 2095, 2111, 2145, 2181, 2254, 2350, 2388, 2460, 2464]
seg_arr = [0,204,579,1725,1978,2388,3428];
slide_in_seg_arr = [[30,6120],[6120,9390,11130,12180,13710],[13710,15450,17370,17670,18240,18690,18990,19200,21000,22170,24030,27240,27810,28080,32070,34860,39300,40680,40830,42630,45240,47610,48780,49470,50850,51750],[51750,52140,53700,54060,55140,56070,56790,56820,56850,57030,59340],[59340,62370,62850,63330,65430,67620,70500,71640],[71640,73800,73920,102840]]
wave ={"global":"[ 1 0 0 2 0 0 ]", "dollar":"[ 1 0 5 0 0 0 ]", "focus":"[ 1 1 0 1 0 0 ]", "month":"[ 1 0 2 1 1 0 ]", "row":"[ 0 0 0 2 1 0 ]", "electricity":"[ 0 0 0 0 0 2 ]", "technique":"[ 0 0 2 1 0 0 ]", "environment":"[ 2 0 0 0 0 0 ]", "rwanda":"[ 0 0 2 0 1 0 ]", "worth":"[ 1 0 1 0 0 1 ]", "risk":"[ 0 0 0 0 0 2 ]", "difference":"[ 0 0 2 0 0 0 ]", "entire":"[ 0 0 2 0 0 0 ]", "level":"[ 0 1 2 1 2 1 ]", "list":"[ 0 0 0 1 1 0 ]", "large":"[ 0 0 2 1 0 1 ]", "team":"[ 1 1 0 0 0 0 ]", "small":"[ 0 0 3 0 0 1 ]", "guy":"[ 1 2 3 1 1 0 ]", "revolution":"[ 0 0 3 0 0 0 ]", "ten":"[ 0 1 1 0 0 1 ]", "trend":"[ 0 0 2 0 0 0 ]", "direct":"[ 0 0 1 0 0 2 ]", "crop":"[ 2 4 11 0 0 10 ]", "past":"[ 0 1 1 0 1 1 ]", "cost":"[ 0 0 5 0 0 1 ]", "video":"[ 0 0 2 0 0 0 ]", "picked":"[ 0 1 0 1 1 0 ]", "investment":"[ 0 0 1 0 0 3 ]", "blue":"[ 0 0 2 0 1 0 ]", "darkness":"[ 0 0 1 1 0 0 ]", "access":"[ 0 0 4 0 1 2 ]", "net":"[ 0 0 1 1 0 0 ]", "told":"[ 0 0 0 2 0 0 ]", "error":"[ 0 1 1 0 0 0 ]", "poverty":"[ 0 6 1 6 17 2 ]", "path":"[ 0 0 0 0 1 1 ]", "change":"[ 2 0 0 0 0 1 ]", "search":"[ 0 0 0 0 0 2 ]", "study":"[ 2 1 1 0 0 0 ]", "experience":"[ 1 0 0 0 0 1 ]", "trial":"[ 0 0 0 0 0 3 ]", "amount":"[ 0 0 1 0 1 0 ]", "survey":"[ 0 0 0 4 7 0 ]", "pick":"[ 0 0 0 1 0 1 ]", "africa":"[ 1 0 0 2 4 4 ]", "compare":"[ 0 0 2 0 2 0 ]", "county":"[ 0 0 3 0 0 0 ]", "soybean":"[ 0 0 4 0 0 2 ]", "fake":"[ 0 0 4 0 0 0 ]", "landscape":"[ 0 0 1 2 0 0 ]", "confidence":"[ 0 1 0 0 0 1 ]", "eye":"[ 0 0 0 2 0 0 ]", "france":"[ 0 0 3 0 0 0 ]", "process":"[ 0 0 1 0 0 2 ]", "live":"[ 0 1 1 0 0 0 ]", "call":"[ 0 0 3 1 0 1 ]", "asset":"[ 0 0 0 1 1 0 ]", "type":"[ 0 4 2 2 2 6 ]", "tell":"[ 0 1 1 0 0 2 ]", "today":"[ 3 2 2 0 0 1 ]", "sort":"[ 2 6 21 4 1 11 ]", "clever":"[ 0 0 0 0 1 1 ]", "advance":"[ 0 0 1 2 0 0 ]", "company":"[ 0 0 2 0 0 0 ]", "phone":"[ 0 0 7 0 3 2 ]", "train":"[ 0 0 2 6 5 3 ]", "baby":"[ 0 0 0 0 1 1 ]", "effort":"[ 1 1 0 0 0 1 ]", "topic":"[ 0 0 0 0 0 2 ]", "word":"[ 0 1 1 0 1 1 ]", "room":"[ 0 0 0 1 1 0 ]", "science":"[ 8 6 6 0 2 7 ]", "challenge":"[ 0 0 1 0 0 2 ]", "work":"[ 1 2 10 2 7 8 ]", "roof":"[ 0 0 0 2 3 1 ]", "obvious":"[ 0 0 1 0 0 1 ]", "learn":"[ 0 0 3 3 0 3 ]", "example":"[ 0 3 1 1 0 0 ]", "history":"[ 0 2 2 0 0 1 ]", "funders":"[ 1 1 0 0 0 0 ]", "crazy":"[ 1 1 0 0 0 0 ]", "stream":"[ 0 1 1 0 0 0 ]", "predict":"[ 0 4 3 1 2 1 ]", "household":"[ 0 0 2 3 7 0 ]", "india":"[ 0 0 0 0 0 2 ]", "sample":"[ 0 0 2 0 2 0 ]", "incremental":"[ 0 0 0 0 1 1 ]", "sense":"[ 0 3 8 1 1 0 ]", "association":"[ 1 0 0 0 0 1 ]", "huge":"[ 0 1 3 1 1 1 ]", "productive":"[ 0 0 3 0 0 1 ]", "end":"[ 0 0 0 0 1 7 ]", "goal":"[ 1 1 0 0 0 0 ]", "feature":"[ 0 0 1 13 7 0 ]", "machine":"[ 0 0 4 0 0 0 ]", "machine-learning":"[ 0 0 0 0 2 0 ]", "answer":"[ 0 0 1 0 0 5 ]", "map":"[ 0 0 2 1 2 0 ]", "product":"[ 0 0 2 0 0 0 ]", "funny":"[ 1 1 0 0 0 0 ]", "lab":"[ 0 1 1 0 0 0 ]", "stefano":"[ 0 0 1 1 0 0 ]", "wrong":"[ 0 0 1 0 0 1 ]", "faculty":"[ 1 1 0 0 0 1 ]", "date":"[ 0 0 1 0 0 1 ]", "monitoring":"[ 0 0 3 0 0 0 ]", "data":"[ 8 18 34 2 12 23 ]", "short":"[ 0 0 0 0 0 4 ]", "light":"[ 0 0 2 11 4 11 ]", "borrowing":"[ 0 1 1 0 0 0 ]", "green":"[ 0 0 1 0 0 3 ]", "fundamental":"[ 0 0 1 0 1 1 ]", "correlation":"[ 0 0 2 0 3 0 ]", "pleasure":"[ 1 0 0 0 0 2 ]", "order":"[ 1 1 4 0 0 1 ]", "talk":"[ 4 5 3 0 0 2 ]", "typical":"[ 0 2 0 0 0 0 ]", "developed":"[ 0 0 2 1 0 0 ]", "insight":"[ 0 0 2 0 0 1 ]", "major":"[ 3 0 0 0 0 0 ]", "meter":"[ 0 0 6 0 1 0 ]", "motorcycle":"[ 0 0 0 1 1 0 ]", "agricultural":"[ 1 0 3 0 0 1 ]", "bunch":"[ 0 0 1 1 0 0 ]", "perfect":"[ 0 0 2 0 0 1 ]", "group":"[ 0 0 2 0 0 3 ]", "monitor":"[ 0 0 1 0 0 1 ]", "personal":"[ 1 0 0 0 0 2 ]", "production":"[ 0 2 0 0 0 0 ]", "farmer":"[ 0 1 7 0 0 8 ]", "policy":"[ 0 1 0 0 0 1 ]", "main":"[ 1 2 1 1 2 2 ]", "colleague":"[ 0 1 1 0 0 0 ]", "good":"[ 0 2 10 1 3 5 ]", "combination":"[ 0 0 2 0 0 0 ]", "food":"[ 2 8 5 0 1 1 ]", "propose":"[ 1 1 0 0 0 0 ]", "scene":"[ 1 0 0 1 1 0 ]", "mention":"[ 0 0 2 0 0 1 ]", "half":"[ 0 0 2 0 3 0 ]", "silver":"[ 0 0 0 0 1 1 ]", "bigger":"[ 1 1 0 1 2 1 ]", "term":"[ 1 1 10 5 4 11 ]", "intervene":"[ 0 0 0 0 1 1 ]", "magnitude":"[ 1 1 1 0 0 0 ]", "side":"[ 0 3 0 0 1 2 ]", "mean":"[ 0 0 1 2 0 1 ]", "square":"[ 0 0 1 0 4 0 ]", "series":"[ 2 1 1 0 0 0 ]", "energy":"[ 0 0 0 0 1 1 ]", "hard":"[ 1 0 1 0 1 1 ]", "idea":"[ 0 0 4 3 0 0 ]", "related":"[ 0 0 2 0 0 1 ]", "year":"[ 1 1 10 1 0 7 ]", "logo":"[ 1 1 0 0 0 0 ]", "agriculture":"[ 0 2 4 0 1 2 ]", "insurance":"[ 0 1 0 0 0 5 ]", "category":"[ 1 1 0 0 0 0 ]", "network":"[ 0 0 0 6 1 0 ]", "space":"[ 0 0 0 0 3 0 ]", "publish":"[ 1 1 0 0 0 1 ]", "research":"[ 2 1 4 0 0 0 ]", "increase":"[ 0 0 1 0 0 3 ]", "medicine":"[ 1 0 0 0 2 3 ]", "surprise":"[ 1 1 1 1 1 0 ]", "issue":"[ 0 1 0 0 1 4 ]", "associate":"[ 1 0 1 0 0 0 ]", "u.s.":"[ 0 0 5 0 0 2 ]", "friday":"[ 1 1 0 0 0 1 ]", "story":"[ 0 0 2 0 1 0 ]", "reason":"[ 0 0 3 1 3 1 ]", "proxy":"[ 0 0 2 4 4 1 ]", "put":"[ 0 0 2 3 0 1 ]", "estimate":"[ 0 2 3 0 0 0 ]", "hand":"[ 1 3 2 0 0 0 ]", "generate":"[ 0 1 1 0 0 0 ]", "care":"[ 0 0 2 0 0 0 ]", "definition":"[ 0 1 0 0 1 0 ]", "training":"[ 0 0 3 1 3 1 ]", "david":"[ 5 0 0 0 0 1 ]", "thing":"[ 1 7 17 1 5 11 ]", "place":"[ 0 1 1 0 1 1 ]", "high-resolution":"[ 0 0 0 1 2 0 ]", "feed":"[ 0 0 2 3 0 2 ]", "intuition":"[ 0 0 0 0 2 0 ]", "usda":"[ 0 0 3 0 0 0 ]", "feel":"[ 0 0 2 0 0 1 ]", "number":"[ 1 2 2 0 0 0 ]", "clear":"[ 0 0 0 1 1 1 ]", "smaller":"[ 0 0 1 0 1 0 ]", "president":"[ 0 0 0 0 0 2 ]", "size":"[ 1 2 3 1 0 0 ]", "guess":"[ 1 1 2 1 1 3 ]", "genotype":"[ 0 2 0 0 0 0 ]", "top":"[ 0 0 1 1 2 1 ]", "system":"[ 2 1 2 1 0 3 ]", "priority":"[ 2 0 0 0 0 1 ]", "white":"[ 2 0 0 0 0 1 ]", "urban":"[ 0 0 1 2 0 0 ]", "lot":"[ 0 3 12 6 7 8 ]", "mariano":"[ 1 1 0 0 0 0 ]", "season":"[ 0 1 2 0 0 0 ]", "explanation":"[ 0 0 0 0 2 0 ]", "prediction":"[ 0 0 0 0 1 1 ]", "environmental":"[ 1 1 1 0 0 1 ]", "imagery":"[ 0 0 7 1 3 5 ]", "simulate":"[ 0 0 4 0 0 1 ]", "holder":"[ 0 0 1 0 0 1 ]", "population":"[ 0 0 2 0 1 0 ]", "kind":"[ 5 7 14 3 3 6 ]", "anticipate":"[ 1 1 0 0 0 0 ]", "database":"[ 0 0 2 1 0 1 ]", "tree":"[ 0 0 2 0 2 0 ]", "nightlights":"[ 0 0 0 1 1 0 ]", "project":"[ 3 5 0 0 0 0 ]", "matter":"[ 0 0 1 0 0 3 ]", "individual":"[ 0 0 8 0 2 0 ]", "outcome":"[ 0 1 1 0 0 4 ]", "points71":"[ 0 0 0 1 1 0 ]", "measure":"[ 0 3 6 4 5 3 ]", "spectrum":"[ 0 0 0 0 0 3 ]", "medical":"[ 0 0 0 0 1 1 ]", "uganda":"[ 0 0 2 1 3 1 ]", "seminar":"[ 1 1 0 0 0 0 ]", "lie":"[ 0 0 1 1 1 0 ]", "strength":"[ 1 1 0 0 0 0 ]", "instance":"[ 0 0 0 1 1 0 ]", "high":"[ 0 0 2 1 2 3 ]", "build":"[ 1 2 2 0 0 0 ]", "performance":"[ 0 3 1 0 0 0 ]", "accuracy":"[ 0 0 0 1 1 0 ]", "begin":"[ 0 0 2 0 1 1 ]", "regular":"[ 0 0 0 1 1 0 ]", "plenty":"[ 0 0 2 0 0 0 ]", "payment":"[ 0 1 0 0 0 1 ]", "observation":"[ 0 0 4 0 0 4 ]", "surprising":"[ 0 0 0 0 4 0 ]", "mobile":"[ 0 1 1 0 0 1 ]", "co-opted":"[ 1 1 0 0 0 0 ]", "average":"[ 0 0 4 0 6 1 ]", "cover":"[ 0 0 0 0 2 0 ]", "part":"[ 1 1 5 1 1 3 ]", "clean":"[ 0 0 0 1 1 0 ]", "fact":"[ 1 2 0 0 1 3 ]", "shot":"[ 1 1 0 0 0 0 ]", "show":"[ 0 0 2 0 1 1 ]", "bright":"[ 0 0 0 3 0 0 ]", "session":"[ 0 1 0 0 0 1 ]", "radio":"[ 0 0 0 1 1 0 ]", "threshold":"[ 0 0 0 0 0 3 ]", "earth":"[ 1 0 1 1 0 0 ]", "cheaply":"[ 0 1 2 0 0 0 ]", "decade":"[ 0 0 3 0 0 1 ]", "knowledge":"[ 0 0 0 1 1 1 ]", "explain":"[ 0 0 1 1 3 1 ]", "factor":"[ 0 1 0 0 0 1 ]", "hope":"[ 0 0 1 0 0 1 ]", "stop":"[ 0 0 0 0 0 2 ]", "wheelhouse":"[ 0 0 1 1 0 0 ]", "yield":"[ 1 1 6 0 0 2 ]", "summary":"[ 0 0 0 1 1 0 ]", "bad":"[ 0 0 2 0 0 1 ]", "stuff":"[ 0 2 0 0 0 3 ]", "common":"[ 0 0 1 0 0 1 ]", "activity":"[ 0 0 2 0 0 0 ]", "implication":"[ 0 0 2 0 0 0 ]", "require":"[ 0 0 0 0 0 2 ]", "vision":"[ 0 0 0 2 0 0 ]", "view":"[ 0 0 1 0 0 1 ]", "respond":"[ 0 0 3 0 0 1 ]", "predictive":"[ 0 0 0 2 2 0 ]", "set":"[ 0 0 3 1 1 3 ]", "relative":"[ 0 0 1 0 1 2 ]", "analytics":"[ 0 1 1 0 0 0 ]", "intensity":"[ 0 0 0 1 1 0 ]", "computer":"[ 0 0 2 2 1 0 ]", "result":"[ 1 0 0 1 1 0 ]", "sea":"[ 0 0 2 0 0 0 ]", "postdoc":"[ 1 1 0 0 0 0 ]", "subject":"[ 2 0 0 0 0 0 ]", "learns":"[ 0 0 2 0 0 0 ]", "pattern":"[ 0 0 2 1 1 1 ]", "state":"[ 1 0 1 0 0 0 ]", "kilometer":"[ 0 0 0 0 2 0 ]", "progress":"[ 0 0 6 1 1 1 ]", "approach":"[ 0 0 3 5 4 4 ]", "warrior":"[ 2 2 0 0 0 1 ]", "ability":"[ 0 1 0 0 1 3 ]", "importance":"[ 1 0 0 0 0 1 ]", "job":"[ 0 0 0 1 1 0 ]", "key":"[ 0 1 0 0 1 1 ]", "cop":"[ 0 0 2 0 0 1 ]", "climate":"[ 3 0 0 0 0 0 ]", "country":"[ 0 1 2 2 16 0 ]", "sensitive":"[ 0 0 0 0 2 0 ]", "variance":"[ 0 0 2 0 0 0 ]", "relevant":"[ 0 2 1 0 0 0 ]", "point":"[ 1 2 3 2 1 2 ]", "simple":"[ 0 0 2 0 0 0 ]", "period":"[ 0 0 2 0 0 0 ]", "village":"[ 0 0 0 0 6 0 ]", "undergraduate":"[ 1 1 1 0 0 0 ]", "expensive":"[ 0 1 3 0 1 1 ]", "belt":"[ 0 0 4 0 0 0 ]", "addition":"[ 0 0 2 0 0 0 ]", "genetic":"[ 0 0 2 0 0 0 ]", "interest":"[ 0 0 2 0 0 1 ]", "basic":"[ 0 1 1 0 1 1 ]", "reflective":"[ 0 0 0 0 0 2 ]", "website":"[ 1 0 1 0 0 1 ]", "life":"[ 0 1 1 0 0 1 ]", "diversity":"[ 0 0 0 0 0 2 ]", "thousand":"[ 1 0 5 3 2 0 ]", "great":"[ 0 1 3 1 0 2 ]", "expenditure":"[ 0 0 1 0 3 1 ]", "case":"[ 1 0 4 0 3 1 ]", "commerce":"[ 0 0 0 0 1 1 ]", "harder":"[ 0 0 0 0 0 2 ]", "value":"[ 0 0 0 1 1 0 ]", "air":"[ 1 1 0 0 0 0 ]", "information":"[ 1 0 3 0 0 3 ]", "suppose":"[ 1 1 0 0 0 0 ]", "behavior":"[ 0 1 1 0 0 0 ]", "promising":"[ 0 0 0 0 1 1 ]", "situation":"[ 0 1 0 0 0 1 ]", "soil":"[ 0 0 8 0 0 0 ]", "surface":"[ 0 0 2 0 0 0 ]", "shame":"[ 1 1 0 0 0 0 ]", "over-promising":"[ 0 0 0 0 1 1 ]", "regression":"[ 0 0 0 1 2 0 ]", "capture":"[ 0 0 0 0 1 1 ]", "productivity":"[ 0 1 6 0 0 3 ]", "credit":"[ 0 0 0 0 0 3 ]", "nod":"[ 1 1 0 0 0 0 ]", "speaker":"[ 3 0 0 0 0 0 ]", "smarter":"[ 0 0 0 0 1 1 ]", "difficult":"[ 0 0 1 0 0 1 ]", "development":"[ 0 0 0 0 0 2 ]", "satellite":"[ 0 0 6 0 0 0 ]", "effect":"[ 0 0 3 0 0 2 ]", "phd":"[ 1 0 1 0 0 0 ]", "director":"[ 2 0 0 0 0 0 ]", "student":"[ 1 1 3 0 0 3 ]", "opportunity":"[ 1 0 1 0 0 0 ]", "neural":"[ 0 0 0 7 1 0 ]", "spent":"[ 0 0 0 1 1 0 ]", "person":"[ 0 0 0 0 2 0 ]", "simulated":"[ 0 0 2 0 0 1 ]", "model":"[ 1 2 15 5 7 7 ]", "summer":"[ 0 2 0 0 0 0 ]", "money":"[ 0 0 0 1 1 1 ]", "continent":"[ 0 0 0 0 0 2 ]", "web":"[ 0 3 0 0 0 0 ]", "field":"[ 0 1 9 0 2 12 ]", "location":"[ 0 0 1 1 2 0 ]", "input":"[ 0 0 0 0 0 2 ]", "unprecedented":"[ 0 0 2 0 0 0 ]", "real":"[ 0 0 4 0 0 2 ]", "government":"[ 0 0 0 0 2 1 ]", "big":"[ 0 2 4 0 0 1 ]", "couple":"[ 1 1 1 0 0 1 ]", "income":"[ 0 0 2 0 0 0 ]", "disagreement":"[ 0 0 0 0 0 2 ]", "gonna":"[ 0 1 3 1 0 0 ]", "dark":"[ 0 0 0 2 3 0 ]", "game":"[ 1 1 0 0 0 1 ]", "indicative":"[ 0 0 1 1 0 0 ]", "world":"[ 0 0 4 1 1 1 ]", "bit":"[ 1 1 5 3 6 9 ]", "counterintuitive":"[ 0 0 0 1 1 0 ]", "success":"[ 1 0 0 0 1 0 ]", "signal":"[ 0 0 2 0 0 0 ]", "zoom":"[ 0 0 3 0 0 0 ]", "audience":"[ 0 1 1 0 0 0 ]", "indication":"[ 0 0 3 0 1 0 ]", "night":"[ 0 0 0 9 3 2 ]", "output":"[ 0 0 2 0 0 2 ]", "security":"[ 2 5 0 0 1 1 ]", "google":"[ 0 0 5 0 0 2 ]", "people":"[ 2 2 15 1 1 3 ]", "stuffy":"[ 0 0 2 1 0 0 ]", "recognition":"[ 0 0 1 1 0 0 ]", "genetics":"[ 0 1 1 0 0 0 ]", "daytime":"[ 0 0 0 1 1 1 ]", "unit":"[ 0 1 1 0 0 0 ]", "provider":"[ 0 0 0 0 0 2 ]", "bold":"[ 0 0 0 1 1 0 ]", "corn":"[ 0 0 11 0 0 1 ]", "stefan":"[ 0 0 1 1 0 0 ]", "step":"[ 0 2 1 0 1 0 ]", "limitation":"[ 0 0 0 0 1 1 ]", "actual":"[ 0 0 2 2 2 0 ]", "netflix":"[ 0 0 0 0 0 2 ]", "simulation":"[ 0 0 7 0 1 10 ]", "leverage":"[ 0 0 2 1 0 0 ]", "predictor":"[ 0 0 0 2 2 0 ]", "road":"[ 0 0 0 6 1 3 ]", "image":"[ 0 0 4 6 1 6 ]", "weather":"[ 0 0 4 0 0 0 ]", "intervention":"[ 0 3 0 0 0 9 ]", "area":"[ 0 0 10 4 2 4 ]", "transfer":"[ 0 0 1 2 3 2 ]", "initial":"[ 0 0 0 1 1 0 ]", "question":"[ 3 1 4 1 1 10 ]", "start":"[ 0 0 3 0 1 1 ]", "low":"[ 0 1 0 0 1 0 ]", "way":"[ 0 1 1 0 3 3 ]", "house":"[ 2 0 2 1 1 1 ]", "maze":"[ 0 1 0 0 0 2 ]", "translate":"[ 0 1 1 0 1 0 ]", "allah":"[ 1 1 0 0 0 0 ]", "yeah":"[ 0 0 2 0 0 4 ]", "gain":"[ 0 0 0 1 1 1 ]", "delta":"[ 0 0 0 0 1 1 ]", "line":"[ 0 0 0 0 6 0 ]", "true":"[ 0 0 2 0 1 1 ]", "buying":"[ 0 1 1 0 0 0 ]", "pull":"[ 0 0 0 0 2 0 ]", "stanford":"[ 5 0 0 1 0 1 ]", "malawi":"[ 0 1 0 0 2 0 ]", "um":"[ 0 0 0 1 0 2 ]", "record":"[ 0 0 2 0 4 1 ]", "problem":"[ 0 8 1 0 0 1 ]", "similar":"[ 0 0 1 0 0 2 ]", "professor":"[ 1 0 2 0 0 1 ]", "measurement":"[ 0 2 3 1 1 1 ]", "direction":"[ 0 0 0 0 0 2 ]", "deep":"[ 0 0 0 5 0 0 ]", "wavelength":"[ 0 0 2 0 0 1 ]", "education":"[ 0 0 0 0 2 2 ]", "campus":"[ 0 2 0 0 0 0 ]", "detail":"[ 0 0 2 1 0 0 ]", "graduate":"[ 1 1 0 0 0 0 ]", "application":"[ 1 0 2 0 0 2 ]", "interested":"[ 0 0 0 0 0 2 ]", "spatial":"[ 0 0 2 1 1 0 ]", "test":"[ 0 1 1 0 1 3 ]", "nice":"[ 0 0 3 0 0 0 ]", "poor":"[ 0 0 6 1 0 0 ]", "picture":"[ 0 0 5 1 0 1 ]", "variation":"[ 0 1 2 1 3 1 ]", "stay":"[ 2 0 0 0 0 0 ]", "important":"[ 0 0 2 1 0 1 ]", "observables":"[ 0 0 2 0 0 0 ]", "fertilizer":"[ 0 0 1 0 0 3 ]", "leaf":"[ 0 0 3 0 0 1 ]", "building":"[ 0 1 0 0 1 1 ]", "land":"[ 0 1 4 0 0 0 ]", "algorithm":"[ 0 0 2 1 2 2 ]", "vice":"[ 0 0 1 0 0 2 ]", "time":"[ 1 1 14 0 2 7 ]", "alright":"[ 1 1 1 0 1 1 ]", "understand":"[ 0 0 3 0 0 2 ]", "resolution":"[ 0 0 6 2 0 4 ]"}

frequency_list = [{"text":"global","size":10}, {"text":"dollar","size":11}, {"text":"focus","size":10}, {"text":"month","size":11}, {"text":"row","size":10}, {"text":"electricity","size":10}, {"text":"technique","size":10}, {"text":"environment","size":10}, {"text":"rwanda","size":10}, {"text":"worth","size":10}, {"text":"risk","size":10}, {"text":"difference","size":10}, {"text":"entire","size":10}, {"text":"level","size":11}, {"text":"list","size":10}, {"text":"large","size":10}, {"text":"team","size":10}, {"text":"small","size":10}, {"text":"guy","size":12}, {"text":"revolution","size":10}, {"text":"ten","size":10}, {"text":"trend","size":10}, {"text":"direct","size":10}, {"text":"crop","size":18}, {"text":"past","size":10}, {"text":"cost","size":11}, {"text":"video","size":10}, {"text":"picked","size":10}, {"text":"investment","size":10}, {"text":"blue","size":10}, {"text":"darkness","size":10}, {"text":"access","size":11}, {"text":"net","size":10}, {"text":"told","size":10}, {"text":"error","size":10}, {"text":"poverty","size":19}, {"text":"path","size":10}, {"text":"change","size":10}, {"text":"search","size":10}, {"text":"study","size":10}, {"text":"experience","size":10}, {"text":"trial","size":10}, {"text":"amount","size":10}, {"text":"survey","size":13}, {"text":"pick","size":10}, {"text":"africa","size":13}, {"text":"compare","size":10}, {"text":"county","size":10}, {"text":"soybean","size":11}, {"text":"fake","size":10}, {"text":"landscape","size":10}, {"text":"confidence","size":10}, {"text":"eye","size":10}, {"text":"france","size":10}, {"text":"process","size":10}, {"text":"live","size":10}, {"text":"call","size":11}, {"text":"asset","size":10}, {"text":"type","size":14}, {"text":"tell","size":10}, {"text":"today","size":12}, {"text":"sort","size":23}, {"text":"clever","size":10}, {"text":"advance","size":10}, {"text":"company","size":10}, {"text":"phone","size":13}, {"text":"train","size":14}, {"text":"baby","size":10}, {"text":"effort","size":10}, {"text":"topic","size":10}, {"text":"word","size":10}, {"text":"room","size":10}, {"text":"science","size":18}, {"text":"challenge","size":10}, {"text":"work","size":19}, {"text":"roof","size":11}, {"text":"obvious","size":10}, {"text":"learn","size":12}, {"text":"example","size":11}, {"text":"history","size":11}, {"text":"funders","size":10}, {"text":"crazy","size":10}, {"text":"stream","size":10}, {"text":"predict","size":13}, {"text":"household","size":13}, {"text":"india","size":10}, {"text":"sample","size":10}, {"text":"incremental","size":10}, {"text":"sense","size":13}, {"text":"association","size":10}, {"text":"huge","size":11}, {"text":"productive","size":10}, {"text":"end","size":12}, {"text":"goal","size":10}, {"text":"feature","size":16}, {"text":"machine","size":10}, {"text":"machine-learning","size":10}, {"text":"answer","size":11}, {"text":"map","size":11}, {"text":"product","size":10}, {"text":"funny","size":10}, {"text":"lab","size":10}, {"text":"stefano","size":10}, {"text":"wrong","size":10}, {"text":"faculty","size":10}, {"text":"date","size":10}, {"text":"monitoring","size":10}, {"text":"data","size":40}, {"text":"short","size":10}, {"text":"light","size":18}, {"text":"borrowing","size":10}, {"text":"green","size":10}, {"text":"fundamental","size":10}, {"text":"correlation","size":11}, {"text":"pleasure","size":10}, {"text":"order","size":11}, {"text":"talk","size":14}, {"text":"typical","size":10}, {"text":"developed","size":10}, {"text":"insight","size":10}, {"text":"major","size":10}, {"text":"meter","size":11}, {"text":"motorcycle","size":10}, {"text":"agricultural","size":11}, {"text":"bunch","size":10}, {"text":"perfect","size":10}, {"text":"group","size":11}, {"text":"monitor","size":10}, {"text":"personal","size":10}, {"text":"production","size":10}, {"text":"farmer","size":14}, {"text":"policy","size":10}, {"text":"main","size":12}, {"text":"colleague","size":10}, {"text":"good","size":16}, {"text":"combination","size":10}, {"text":"food","size":15}, {"text":"propose","size":10}, {"text":"scene","size":10}, {"text":"mention","size":10}, {"text":"half","size":11}, {"text":"silver","size":10}, {"text":"bigger","size":11}, {"text":"term","size":19}, {"text":"intervene","size":10}, {"text":"magnitude","size":10}, {"text":"side","size":11}, {"text":"mean","size":10}, {"text":"square","size":11}, {"text":"series","size":10}, {"text":"energy","size":10}, {"text":"hard","size":10}, {"text":"idea","size":11}, {"text":"related","size":10}, {"text":"year","size":15}, {"text":"logo","size":10}, {"text":"agriculture","size":12}, {"text":"insurance","size":11}, {"text":"category","size":10}, {"text":"network","size":11}, {"text":"space","size":10}, {"text":"publish","size":10}, {"text":"research","size":11}, {"text":"increase","size":10}, {"text":"medicine","size":11}, {"text":"surprise","size":11}, {"text":"issue","size":11}, {"text":"associate","size":10}, {"text":"u.s.","size":11}, {"text":"friday","size":10}, {"text":"story","size":10}, {"text":"reason","size":12}, {"text":"proxy","size":13}, {"text":"put","size":11}, {"text":"estimate","size":11}, {"text":"hand","size":11}, {"text":"generate","size":10}, {"text":"care","size":10}, {"text":"definition","size":10}, {"text":"training","size":12}, {"text":"david","size":11}, {"text":"thing","size":22}, {"text":"place","size":10}, {"text":"high-resolution","size":10}, {"text":"feed","size":11}, {"text":"intuition","size":10}, {"text":"usda","size":10}, {"text":"feel","size":10}, {"text":"number","size":11}, {"text":"clear","size":10}, {"text":"smaller","size":10}, {"text":"president","size":10}, {"text":"size","size":11}, {"text":"guess","size":12}, {"text":"genotype","size":10}, {"text":"top","size":11}, {"text":"system","size":12}, {"text":"priority","size":10}, {"text":"white","size":10}, {"text":"urban","size":10}, {"text":"lot","size":20}, {"text":"mariano","size":10}, {"text":"season","size":10}, {"text":"explanation","size":10}, {"text":"prediction","size":10}, {"text":"environmental","size":10}, {"text":"imagery","size":14}, {"text":"simulate","size":11}, {"text":"holder","size":10}, {"text":"population","size":10}, {"text":"kind","size":21}, {"text":"anticipate","size":10}, {"text":"database","size":10}, {"text":"tree","size":10}, {"text":"nightlights","size":10}, {"text":"project","size":12}, {"text":"matter","size":10}, {"text":"individual","size":12}, {"text":"outcome","size":11}, {"text":"points71","size":10}, {"text":"measure","size":16}, {"text":"spectrum","size":10}, {"text":"medical","size":10}, {"text":"uganda","size":11}, {"text":"seminar","size":10}, {"text":"lie","size":10}, {"text":"strength","size":10}, {"text":"instance","size":10}, {"text":"high","size":12}, {"text":"build","size":11}, {"text":"performance","size":10}, {"text":"accuracy","size":10}, {"text":"begin","size":10}, {"text":"regular","size":10}, {"text":"plenty","size":10}, {"text":"payment","size":10}, {"text":"observation","size":12}, {"text":"surprising","size":10}, {"text":"mobile","size":10}, {"text":"co-opted","size":10}, {"text":"average","size":13}, {"text":"cover","size":10}, {"text":"part","size":13}, {"text":"clean","size":10}, {"text":"fact","size":11}, {"text":"shot","size":10}, {"text":"show","size":10}, {"text":"bright","size":10}, {"text":"session","size":10}, {"text":"radio","size":10}, {"text":"threshold","size":10}, {"text":"earth","size":10}, {"text":"cheaply","size":10}, {"text":"decade","size":10}, {"text":"knowledge","size":10}, {"text":"explain","size":11}, {"text":"factor","size":10}, {"text":"hope","size":10}, {"text":"stop","size":10}, {"text":"wheelhouse","size":10}, {"text":"yield","size":12}, {"text":"summary","size":10}, {"text":"bad","size":10}, {"text":"stuff","size":11}, {"text":"common","size":10}, {"text":"activity","size":10}, {"text":"implication","size":10}, {"text":"require","size":10}, {"text":"vision","size":10}, {"text":"view","size":10}, {"text":"respond","size":10}, {"text":"predictive","size":10}, {"text":"set","size":12}, {"text":"relative","size":10}, {"text":"analytics","size":10}, {"text":"intensity","size":10}, {"text":"computer","size":11}, {"text":"result","size":10}, {"text":"sea","size":10}, {"text":"postdoc","size":10}, {"text":"subject","size":10}, {"text":"learns","size":10}, {"text":"pattern","size":11}, {"text":"state","size":10}, {"text":"kilometer","size":10}, {"text":"progress","size":12}, {"text":"approach","size":14}, {"text":"warrior","size":11}, {"text":"ability","size":11}, {"text":"importance","size":10}, {"text":"job","size":10}, {"text":"key","size":10}, {"text":"cop","size":10}, {"text":"climate","size":10}, {"text":"country","size":16}, {"text":"sensitive","size":10}, {"text":"variance","size":10}, {"text":"relevant","size":10}, {"text":"point","size":13}, {"text":"simple","size":10}, {"text":"period","size":10}, {"text":"village","size":11}, {"text":"undergraduate","size":10}, {"text":"expensive","size":11}, {"text":"belt","size":10}, {"text":"addition","size":10}, {"text":"genetic","size":10}, {"text":"interest","size":10}, {"text":"basic","size":10}, {"text":"reflective","size":10}, {"text":"website","size":10}, {"text":"life","size":10}, {"text":"diversity","size":10}, {"text":"thousand","size":13}, {"text":"great","size":11}, {"text":"expenditure","size":11}, {"text":"case","size":12}, {"text":"commerce","size":10}, {"text":"harder","size":10}, {"text":"value","size":10}, {"text":"air","size":10}, {"text":"information","size":11}, {"text":"suppose","size":10}, {"text":"behavior","size":10}, {"text":"promising","size":10}, {"text":"situation","size":10}, {"text":"soil","size":12}, {"text":"surface","size":10}, {"text":"shame","size":10}, {"text":"over-promising","size":10}, {"text":"regression","size":10}, {"text":"capture","size":10}, {"text":"productivity","size":12}, {"text":"credit","size":10}, {"text":"nod","size":10}, {"text":"speaker","size":10}, {"text":"smarter","size":10}, {"text":"difficult","size":10}, {"text":"development","size":10}, {"text":"satellite","size":11}, {"text":"effect","size":11}, {"text":"phd","size":10}, {"text":"director","size":10}, {"text":"student","size":12}, {"text":"opportunity","size":10}, {"text":"neural","size":12}, {"text":"spent","size":10}, {"text":"person","size":10}, {"text":"simulated","size":10}, {"text":"model","size":21}, {"text":"summer","size":10}, {"text":"money","size":10}, {"text":"continent","size":10}, {"text":"web","size":10}, {"text":"field","size":17}, {"text":"location","size":10}, {"text":"input","size":10}, {"text":"unprecedented","size":10}, {"text":"real","size":11}, {"text":"government","size":10}, {"text":"big","size":11}, {"text":"couple","size":10}, {"text":"income","size":10}, {"text":"disagreement","size":10}, {"text":"gonna","size":11}, {"text":"dark","size":11}, {"text":"game","size":10}, {"text":"indicative","size":10}, {"text":"world","size":11}, {"text":"bit","size":17}, {"text":"counterintuitive","size":10}, {"text":"success","size":10}, {"text":"signal","size":10}, {"text":"zoom","size":10}, {"text":"audience","size":10}, {"text":"indication","size":10}, {"text":"night","size":14}, {"text":"output","size":10}, {"text":"security","size":12}, {"text":"google","size":11}, {"text":"people","size":17}, {"text":"stuffy","size":10}, {"text":"recognition","size":10}, {"text":"genetics","size":10}, {"text":"daytime","size":10}, {"text":"unit","size":10}, {"text":"provider","size":10}, {"text":"bold","size":10}, {"text":"corn","size":13}, {"text":"stefan","size":10}, {"text":"step","size":10}, {"text":"limitation","size":10}, {"text":"actual","size":11}, {"text":"netflix","size":10}, {"text":"simulation","size":15}, {"text":"leverage","size":10}, {"text":"predictor","size":10}, {"text":"road","size":12}, {"text":"image","size":15}, {"text":"weather","size":10}, {"text":"intervention","size":13}, {"text":"area","size":15}, {"text":"transfer","size":12}, {"text":"initial","size":10}, {"text":"question","size":15}, {"text":"start","size":11}, {"text":"low","size":10}, {"text":"way","size":12}, {"text":"house","size":11}, {"text":"maze","size":10}, {"text":"translate","size":10}, {"text":"allah","size":10}, {"text":"yeah","size":11}, {"text":"gain","size":10}, {"text":"delta","size":10}, {"text":"line","size":11}, {"text":"true","size":10}, {"text":"buying","size":10}, {"text":"pull","size":10}, {"text":"stanford","size":11}, {"text":"malawi","size":10}, {"text":"um","size":10}, {"text":"record","size":11}, {"text":"problem","size":12}, {"text":"similar","size":10}, {"text":"professor","size":10}, {"text":"measurement","size":12}, {"text":"direction","size":10}, {"text":"deep","size":11}, {"text":"wavelength","size":10}, {"text":"education","size":10}, {"text":"campus","size":10}, {"text":"detail","size":10}, {"text":"graduate","size":10}, {"text":"application","size":11}, {"text":"interested","size":10}, {"text":"spatial","size":10}, {"text":"test","size":11}, {"text":"nice","size":10}, {"text":"poor","size":11}, {"text":"picture","size":11}, {"text":"variation","size":12}, {"text":"stay","size":10}, {"text":"important","size":10}, {"text":"observables","size":10}, {"text":"fertilizer","size":10}, {"text":"leaf","size":10}, {"text":"building","size":10}, {"text":"land","size":11}, {"text":"algorithm","size":11}, {"text":"vice","size":10}, {"text":"time","size":17}, {"text":"alright","size":11}, {"text":"understand","size":11}, {"text":"resolution","size":13}]
frequency_list_1 = [{"text":"environment","size":14}, {"text":"food","size":14}, {"text":"security","size":14}, {"text":"people","size":14}, {"text":"series","size":14}, {"text":"crop","size":14}, {"text":"subject","size":14}, {"text":"research","size":14}, {"text":"warrior","size":14}, {"text":"change","size":14}, {"text":"climate","size":18}, {"text":"study","size":14}, {"text":"david","size":27}, {"text":"major","size":18}, {"text":"data","size":40}, {"text":"question","size":18}, {"text":"system","size":14}, {"text":"priority","size":14}, {"text":"house","size":14}, {"text":"white","size":14}, {"text":"today","size":18}, {"text":"sort","size":14}, {"text":"kind","size":27}, {"text":"stanford","size":27}, {"text":"science","size":40}, {"text":"project","size":18}, {"text":"speaker","size":18}, {"text":"stay","size":14}, {"text":"director","size":14}, {"text":"talk","size":22}]
frequency_list_2 = [{"text":"summer","size":11}, {"text":"web","size":13}, {"text":"production","size":11}, {"text":"main","size":11}, {"text":"good","size":11}, {"text":"food","size":22}, {"text":"stuff","size":11}, {"text":"guy","size":11}, {"text":"side","size":13}, {"text":"people","size":11}, {"text":"crop","size":15}, {"text":"agriculture","size":11}, {"text":"intervention","size":13}, {"text":"warrior","size":11}, {"text":"step","size":11}, {"text":"poverty","size":18}, {"text":"estimate","size":11}, {"text":"security","size":17}, {"text":"thing","size":20}, {"text":"relevant","size":11}, {"text":"point","size":11}, {"text":"number","size":11}, {"text":"size","size":11}, {"text":"genotype","size":11}, {"text":"type","size":15}, {"text":"today","size":11}, {"text":"sort","size":18}, {"text":"lot","size":13}, {"text":"kind","size":20}, {"text":"science","size":18}, {"text":"work","size":11}, {"text":"project","size":17}, {"text":"problem","size":22}, {"text":"example","size":13}, {"text":"history","size":11}, {"text":"predict","size":15}, {"text":"measurement","size":11}, {"text":"measure","size":13}, {"text":"sense","size":13}, {"text":"campus","size":11}, {"text":"build","size":11}, {"text":"big","size":11}, {"text":"performance","size":13}, {"text":"hand","size":13}, {"text":"data","size":40}, {"text":"talk","size":17}, {"text":"model","size":11}, {"text":"fact","size":11}, {"text":"typical","size":11}]
frequency_list_3 = [{"text":"show","size":10}, {"text":"developed","size":10}, {"text":"half","size":10}, {"text":"dollar","size":13}, {"text":"meter","size":14}, {"text":"month","size":10}, {"text":"product","size":10}, {"text":"agricultural","size":11}, {"text":"cheaply","size":10}, {"text":"decade","size":11}, {"text":"perfect","size":10}, {"text":"group","size":10}, {"text":"field","size":17}, {"text":"true","size":10}, {"text":"technique","size":10}, {"text":"feel","size":10}, {"text":"rwanda","size":10}, {"text":"usda","size":11}, {"text":"farmer","size":15}, {"text":"weather","size":12}, {"text":"unprecedented","size":10}, {"text":"real","size":12}, {"text":"good","size":18}, {"text":"combination","size":10}, {"text":"food","size":13}, {"text":"big","size":12}, {"text":"spatial","size":10}, {"text":"measurement","size":11}, {"text":"gonna","size":11}, {"text":"number","size":10}, {"text":"mention","size":10}, {"text":"progress","size":14}, {"text":"world","size":12}, {"text":"bit","size":13}, {"text":"difference","size":10}, {"text":"entire","size":10}, {"text":"term","size":18}, {"text":"level","size":10}, {"text":"signal","size":10}, {"text":"zoom","size":11}, {"text":"yield","size":14}, {"text":"large","size":10}, {"text":"indication","size":11}, {"text":"activity","size":10}, {"text":"small","size":11}, {"text":"output","size":10}, {"text":"implication","size":10}, {"text":"computer","size":10}, {"text":"respond","size":11}, {"text":"revolution","size":11}, {"text":"people","size":22}, {"text":"understand","size":11}, {"text":"house","size":10}, {"text":"begin","size":10}, {"text":"related","size":10}, {"text":"individual","size":16}, {"text":"video","size":10}, {"text":"sea","size":10}, {"text":"measure","size":14}, {"text":"wavelength","size":10}, {"text":"agriculture","size":12}, {"text":"blue","size":10}, {"text":"learns","size":10}, {"text":"learn","size":11}, {"text":"pattern","size":10}, {"text":"bad","size":10}, {"text":"research","size":12}, {"text":"access","size":12}, {"text":"belt","size":12}, {"text":"approach","size":11}, {"text":"corn","size":19}, {"text":"database","size":10}, {"text":"u.s.","size":13}, {"text":"student","size":11}, {"text":"story","size":10}, {"text":"reason","size":11}, {"text":"variation","size":10}, {"text":"put","size":10}, {"text":"estimate","size":11}, {"text":"care","size":10}, {"text":"cop","size":10}, {"text":"training","size":11}, {"text":"actual","size":10}, {"text":"country","size":10}, {"text":"simulation","size":15}, {"text":"thing","size":24}, {"text":"map","size":10}, {"text":"variance","size":10}, {"text":"proxy","size":10}, {"text":"feed","size":10}, {"text":"simulated","size":10}, {"text":"point","size":11}, {"text":"simple","size":10}, {"text":"image","size":12}, {"text":"period","size":10}, {"text":"system","size":10}, {"text":"county","size":11}, {"text":"set","size":11}, {"text":"soybean","size":12}, {"text":"fake","size":12}, {"text":"expensive","size":11}, {"text":"size","size":11}, {"text":"idea","size":12}, {"text":"guess","size":10}, {"text":"leverage","size":10}, {"text":"area","size":18}, {"text":"addition","size":10}, {"text":"question","size":12}, {"text":"genetic","size":10}, {"text":"france","size":11}, {"text":"start","size":11}, {"text":"leaf","size":11}, {"text":"call","size":11}, {"text":"lot","size":20}, {"text":"trend","size":10}, {"text":"type","size":10}, {"text":"today","size":10}, {"text":"interest","size":10}, {"text":"season","size":10}, {"text":"company","size":10}, {"text":"great","size":11}, {"text":"phone","size":15}, {"text":"train","size":10}, {"text":"crop","size":19}, {"text":"simulate","size":12}, {"text":"google","size":13}, {"text":"population","size":10}, {"text":"case","size":12}, {"text":"kind","size":21}, {"text":"science","size":14}, {"text":"work","size":18}, {"text":"tree","size":10}, {"text":"record","size":10}, {"text":"cost","size":13}, {"text":"history","size":10}, {"text":"sort","size":28}, {"text":"compare","size":10}, {"text":"predict","size":11}, {"text":"soil","size":16}, {"text":"household","size":10}, {"text":"year","size":18}, {"text":"surface","size":10}, {"text":"sample","size":10}, {"text":"professor","size":10}, {"text":"guy","size":11}, {"text":"uganda","size":10}, {"text":"sense","size":16}, {"text":"huge","size":11}, {"text":"productive","size":11}, {"text":"monitoring","size":11}, {"text":"insight","size":10}, {"text":"detail","size":10}, {"text":"stuffy","size":10}, {"text":"machine","size":12}, {"text":"application","size":10}, {"text":"high","size":10}, {"text":"build","size":10}, {"text":"income","size":10}, {"text":"thousand","size":13}, {"text":"nice","size":11}, {"text":"poor","size":14}, {"text":"picture","size":13}, {"text":"satellite","size":14}, {"text":"information","size":11}, {"text":"time","size":21}, {"text":"effect","size":11}, {"text":"hand","size":10}, {"text":"important","size":10}, {"text":"plenty","size":10}, {"text":"productivity","size":14}, {"text":"data","size":40}, {"text":"yeah","size":10}, {"text":"imagery","size":15}, {"text":"observation","size":12}, {"text":"algorithm","size":10}, {"text":"light","size":10}, {"text":"average","size":12}, {"text":"land","size":12}, {"text":"part","size":13}, {"text":"correlation","size":10}, {"text":"observables","size":10}, {"text":"model","size":22}, {"text":"resolution","size":14}, {"text":"order","size":12}, {"text":"talk","size":11}]
frequency_list_4 = [{"text":"global","size":12}, {"text":"bright","size":15}, {"text":"dark","size":12}, {"text":"bit","size":15}, {"text":"term","size":20}, {"text":"night","size":30}, {"text":"vision","size":12}, {"text":"mean","size":12}, {"text":"predictive","size":12}, {"text":"idea","size":15}, {"text":"computer","size":12}, {"text":"network","size":22}, {"text":"row","size":12}, {"text":"approach","size":20}, {"text":"told","size":12}, {"text":"poverty","size":22}, {"text":"proxy","size":17}, {"text":"put","size":15}, {"text":"advance","size":12}, {"text":"actual","size":12}, {"text":"country","size":12}, {"text":"survey","size":17}, {"text":"predictor","size":12}, {"text":"road","size":22}, {"text":"feed","size":15}, {"text":"point","size":12}, {"text":"image","size":22}, {"text":"africa","size":12}, {"text":"landscape","size":12}, {"text":"eye","size":12}, {"text":"area","size":17}, {"text":"transfer","size":12}, {"text":"lot","size":22}, {"text":"type","size":12}, {"text":"sort","size":17}, {"text":"urban","size":12}, {"text":"thousand","size":15}, {"text":"train","size":22}, {"text":"kind","size":15}, {"text":"neural","size":25}, {"text":"roof","size":12}, {"text":"learn","size":15}, {"text":"household","size":15}, {"text":"measure","size":17}, {"text":"deep","size":20}, {"text":"work","size":12}, {"text":"feature","size":40}, {"text":"data","size":12}, {"text":"light","size":35}, {"text":"model","size":20}, {"text":"resolution","size":12}]
frequency_list_5 = [{"text":"field","size":11}, {"text":"explain","size":13}, {"text":"location","size":11}, {"text":"main","size":11}, {"text":"good","size":13}, {"text":"government","size":11}, {"text":"dark","size":13}, {"text":"half","size":13}, {"text":"bit","size":19}, {"text":"bigger","size":11}, {"text":"term","size":15}, {"text":"level","size":11}, {"text":"night","size":13}, {"text":"predictive","size":11}, {"text":"square","size":15}, {"text":"individual","size":11}, {"text":"roof","size":13}, {"text":"measure","size":17}, {"text":"space","size":13}, {"text":"kilometer","size":11}, {"text":"medicine","size":11}, {"text":"approach","size":15}, {"text":"reason","size":13}, {"text":"poverty","size":40}, {"text":"proxy","size":15}, {"text":"training","size":13}, {"text":"actual","size":11}, {"text":"country","size":38}, {"text":"thing","size":17}, {"text":"survey","size":21}, {"text":"high-resolution","size":11}, {"text":"predictor","size":11}, {"text":"intuition","size":11}, {"text":"africa","size":15}, {"text":"village","size":19}, {"text":"area","size":11}, {"text":"transfer","size":13}, {"text":"top","size":11}, {"text":"sample","size":11}, {"text":"lot","size":21}, {"text":"type","size":11}, {"text":"malawi","size":11}, {"text":"way","size":13}, {"text":"thousand","size":11}, {"text":"phone","size":13}, {"text":"train","size":17}, {"text":"expenditure","size":13}, {"text":"line","size":19}, {"text":"case","size":13}, {"text":"pull","size":11}, {"text":"kind","size":13}, {"text":"science","size":11}, {"text":"work","size":21}, {"text":"tree","size":11}, {"text":"record","size":15}, {"text":"average","size":19}, {"text":"compare","size":11}, {"text":"predict","size":11}, {"text":"household","size":21}, {"text":"high","size":11}, {"text":"uganda","size":13}, {"text":"education","size":11}, {"text":"regression","size":11}, {"text":"algorithm","size":11}, {"text":"sensitive","size":11}, {"text":"feature","size":21}, {"text":"machine-learning","size":11}, {"text":"explanation","size":11}, {"text":"map","size":11}, {"text":"time","size":11}, {"text":"variation","size":13}, {"text":"data","size":30}, {"text":"imagery","size":13}, {"text":"surprising","size":15}, {"text":"light","size":15}, {"text":"cover","size":11}, {"text":"person","size":11}, {"text":"correlation","size":13}, {"text":"model","size":21}]
frequency_list_6 = [{"text":"threshold","size":12}, {"text":"continent","size":11}, {"text":"access","size":11}, {"text":"group","size":12}, {"text":"application","size":11}, {"text":"personal","size":11}, {"text":"measure","size":12}, {"text":"electricity","size":11}, {"text":"farmer","size":19}, {"text":"input","size":11}, {"text":"main","size":11}, {"text":"real","size":11}, {"text":"good","size":15}, {"text":"risk","size":11}, {"text":"disagreement","size":11}, {"text":"test","size":12}, {"text":"bit","size":20}, {"text":"term","size":23}, {"text":"issue","size":14}, {"text":"yield","size":11}, {"text":"stuff","size":12}, {"text":"night","size":11}, {"text":"output","size":11}, {"text":"side","size":11}, {"text":"set","size":12}, {"text":"people","size":12}, {"text":"crop","size":22}, {"text":"relative","size":11}, {"text":"learn","size":12}, {"text":"year","size":18}, {"text":"agriculture","size":11}, {"text":"insurance","size":15}, {"text":"increase","size":12}, {"text":"provider","size":11}, {"text":"medicine","size":12}, {"text":"approach","size":14}, {"text":"process","size":11}, {"text":"ability","size":12}, {"text":"u.s.","size":11}, {"text":"effect","size":11}, {"text":"poverty","size":11}, {"text":"vice","size":11}, {"text":"netflix","size":11}, {"text":"simulation","size":22}, {"text":"thing","size":23}, {"text":"road","size":12}, {"text":"feed","size":11}, {"text":"point","size":11}, {"text":"search","size":11}, {"text":"image","size":16}, {"text":"africa","size":14}, {"text":"google","size":11}, {"text":"soybean","size":11}, {"text":"president","size":11}, {"text":"reflective","size":11}, {"text":"intervention","size":20}, {"text":"guess","size":12}, {"text":"area","size":14}, {"text":"transfer","size":11}, {"text":"question","size":22}, {"text":"system","size":12}, {"text":"imagery","size":15}, {"text":"lot","size":19}, {"text":"maze","size":11}, {"text":"type","size":16}, {"text":"tell","size":11}, {"text":"phone","size":11}, {"text":"sort","size":23}, {"text":"direction","size":11}, {"text":"diversity","size":11}, {"text":"way","size":12}, {"text":"great","size":11}, {"text":"direct","size":11}, {"text":"yeah","size":14}, {"text":"train","size":12}, {"text":"understand","size":11}, {"text":"kind","size":16}, {"text":"science","size":18}, {"text":"challenge","size":11}, {"text":"work","size":19}, {"text":"harder","size":11}, {"text":"um","size":11}, {"text":"matter","size":12}, {"text":"outcome","size":14}, {"text":"similar","size":11}, {"text":"trial","size":12}, {"text":"india","size":11}, {"text":"spectrum","size":12}, {"text":"topic","size":11}, {"text":"education","size":11}, {"text":"end","size":18}, {"text":"credit","size":12}, {"text":"investment","size":12}, {"text":"field","size":25}, {"text":"high","size":12}, {"text":"interested","size":11}, {"text":"answer","size":15}, {"text":"development","size":11}, {"text":"pleasure","size":11}, {"text":"information","size":12}, {"text":"stop","size":11}, {"text":"require","size":11}, {"text":"student","size":12}, {"text":"fertilizer","size":12}, {"text":"productivity","size":12}, {"text":"data","size":40}, {"text":"short","size":14}, {"text":"observation","size":14}, {"text":"algorithm","size":11}, {"text":"light","size":23}, {"text":"part","size":12}, {"text":"green","size":12}, {"text":"talk","size":11}, {"text":"time","size":18}, {"text":"model","size":18}, {"text":"resolution","size":14}, {"text":"fact","size":12}]
li = [frequency_list_1,frequency_list_2,frequency_list_3,frequency_list_4,frequency_list_5,frequency_list_6]
var sbd = [];
var slide = [];
var seg = [];
var myWordCloud
var word_list;

function ajax_search(word,page) {
	// $("#sub1").css("visibility","hidden");  
	$('#divResu').remove();
	divResu = document.createElement('div');
	$(divResu).attr("id","divResu");
	$('#main').prepend(divResu);
	searchText=word;//write to search results:eg:3 results for "word"
	console.log(searchText);
	// var page = 1;
	loadClusters(word);
	loadCovers(word);
}

function loadCovers(word){
	var videoId="ZchX7tKSm6Q";
	$.ajax({
		url:"/getVideoCover",
		type:"GET",
		data:"key="+word+"&videoId="+videoId,
		dataType:"json",
		success:function(data){
			console.log(data);
			var $div=$("#search_result");
			for(var i=0;i<data.imagePos.length;i++){
				var $d=$("<div></div>");
				$d.css({
					width:data.imagePos[i].width,
					height:data.imagePos[i].height,
					left:data.imagePos[i].x+10,
					top:data.imagePos[i].y+25,
					position:'absolute',
					border:"1px solid green",
				});
				$img=$("<img></img>");
				$img.attr("src",data.images[i]);
				$img.css({
					width:data.imagePos[i].width,
					height:	data.imagePos[i].height
				});
				$d.append($img);
				$div.append($d);
			}
			for(var i=0;i<data.wordsPos.length;i++){
				var $d=$("<div></div>");
				$d.css({
					width:data.wordsPos[i].width,
					height:data.wordsPos[i].height,
					left:data.wordsPos[i].x+10,
					top:data.wordsPos[i].y+25,
					position:'absolute',
					border:"1px solid red"
				});
				svg = document.createElement("div");
				$(svg).jQCloud(data.words[i],
				    {
				    width:data.wordsPos[i].width ,
				    height: data.wordsPos[i].height,
				    shape: 'rectangular',  //rectangular
				   
				    }
				);
				$d.append(svg);
				$div.append($d);
			}
		}

	});
//	$.getJSON("/data/5.json",function(data){
//	console.log(data)
//	var $div=$("#search_result");
//	for(var i=0;i<data.imagePos.length;i++){
//	var $d=$("<div></div>");
//	$d.css({
//	width:data.imagePos[i].width,
//	height:data.imagePos[i].height,
//	left:data.imagePos[i].x+10,
//	top:data.imagePos[i].y+25,
//	position:'absolute',
//	border:"1px solid green",
//	});
//	$div.append($d);
//	}
//	for(var i=0;i<data.wordsPos.length;i++){
//	var $d=$("<div></div>");
//	$d.css({
//	width:data.wordsPos[i].width,
//	height:data.wordsPos[i].height,
//	left:data.wordsPos[i].x+10,
//	top:data.wordsPos[i].y+25,
//	position:'absolute',
//	border:"1px solid red"
//	});
//	$div.append($d);
//	}

//	});
}


function loadVideos(word) {
	//alert("../data/videoinfo/"+word+".json");
	$.getJSON("../data/videoinfo/"+word+".json", function(data){
		//var response = eval("(" + data + ")");
		var response=data;
		var total = response.total;
		$('#videocnt').text(total);
		var pageCount = response.pageCount;
		var pageIndex = response.pageIndex;
		var nextPage = (pageCount>0 && pageIndex<pageCount)? (parseInt(pageIndex)+1) : 0;
		var prePage = (pageCount>0 && pageIndex>0)?(parseInt(pageIndex)-1) : 0;
		var hasPre = pageIndex!= 1;
		var hasNext = pageIndex!=pageCount;
		var videos = response.result;
		var videosCnt = videos.length;
		console.log(total);
		console.log(videos);
		// $('ul').empty();

		var size_li = 0;
		var current_li = videosCnt;
		var segSize = 7;
		var segHalf = Math.floor(segSize/2);


		// $('#pagerid li').remove();
		if(pageCount > 1){
			if(hasPre){
				$('#pagerid').append("<li id="+prePage+"><a href='javascript:void(0)' >&lt;&lt;&nbsp;Previous</a></li>")
			}else{
				$('#pagerid').append("<li class='disabled' id="+prePage+"><a href='javascript:void(0)' >&lt;&lt;&nbsp;Previous</a></li>")
			}

			if(pageCount < segSize){
				for(var pi=1; pi<=pageCount; pi++){
					$('#pagerid').append("<li id="+pi+"><a href='javascript:void(0)'>"+pi+"</a></li>");
				}
			}
			else{
				var first, last;
				if(pageIndex<=segHalf+1){
					first = 1;
					last = segSize;
				}else{
					last = (parseInt(pageIndex)+segHalf < pageCount)? (parseInt(pageIndex)+segHalf) : pageCount;
					first = last - segSize + 1;
					console.log("pageCount : " + pageCount + " | pageIndex+segHalf : " + pageIndex+segHalf + " | pageIndex : " + pageIndex + " | last : " + last);
				}
				console.log("pageCount : " + pageCount + " | pageIndex : " + pageIndex + " | first : " + first + " | last : " + last);
				for(var pi=first; pi<=last; pi++){
					$('#pagerid').append("<li id="+pi+"><a href='javascript:void(0)'>"+pi+"</a></li>");
				}
			}

			if(hasNext){
				$('#pagerid').append("<li id="+nextPage+"><a href='javascript:void(0)'>Next&nbsp;&gt;&gt;</a></li>");
			}
			else{
				$('#pagerid').append("<li class='disabled' id="+nextPage+"><a href='javascript:void(0)'>Next&nbsp;&gt;&gt;</a></li>")
			}
		}


		$("#"+pageIndex+" a").css("background-color","#ccc");
		loadResult(videos,size_li,current_li);
		$(".videolink").click(function(){
			video_id = $(this).find("img").attr("src").split("vi/")[1]
			console.log(video_id);
			var url = "../watch/index.php?v=" +video_id.split("/")[0];
			console.log(url);
			window.location.href=url;
		})
		$('#pagerid li').click(function(){
			var pp = $(this).attr('id');

			// $('#og-grid li').removeClass("og-expanded");
			// $(".og-expander").remove();
			// $(".video_li").remove();
			// liheigth=$("#og-grid li").css("height");
			// alert(liheigth);
			var url = "../result/index.php?q=" + searchText+"&page="+pp;

			window.location.href=url;
			// ajax_search(searchText, pp);


			var queryString = new Array();

			if (queryString.length == 0) {
				if (window.location.search.split('?').length > 1) {
					var params = window.location.search.split('?')[1].split('&');
					for (var i = 0; i < params.length; i++) {
						var key = params[i].split('=')[0];
						var value = decodeURIComponent(params[i].split('=')[1]);
						queryString[key] = value;
					}
				}
			}
			// console.log(queryString)
			$('#searchTxt').val(queryString["q"]);
			ajax_search(queryString["q"],queryString["page"]);})
			return false;	


	});
}

function loadResult(videos,size_li,current_li){
	$(".spinner").css("display","none");

	for ( var i = size_li; i < current_li; i++) {

		var video = videos[i];
		var list,href,img,div,h3,p;
		list = document.createElement('li');
		href = document.createElement('a');
		// img = document.createElement('img');

		divPoster = document.createElement('div');
		divTitle = document.createElement('div');
		divInfo	= document.createElement('div');
		$(list).attr("class","video_li");
		$(divPoster).attr('class','divPoster');
		$(list).append("<a class='videolink'><div class='divPoster'><img src=''><span class='duration'>12:12:12</span></div><div class='divInfo'><div class='divTitle'></div><div class='divDescription'></div><div class='divUploader'><div><span class='glyphicon glyphicon-time' aria-hidden='true'></span><span class='upload_date'></span></div><div><span class='glyphicon glyphicon-user' aria-hidden='true'></span><span class='uploader'>baoquan</span></div><div><span class='glyphicon glyphicon-eye-open' aria-hidden='true'> </span><span class='viewcnt'>2000</span></div></div></div></a>");
		$(list).find("img").attr("src",video.thumbnail);
		console.log(video.thumbnail);
		$(list).find(".divTitle").text(video.fulltitle);
		$(list).find(".duration").text(time_To_hhmmss(parseInt(video.duration)));
		$(list).find(".divDescription").text(video.description);
		// $(list).find(".divDescription").text("");
		$(list).find(".upload_date").text((video.upload_date).split(" ")[0]);
		$(list).find(".uploader").text(video.uploader)
		$(list).find(".viewcnt").text(video.view_count)

		$('#og-grid').append(list);

	}
}

function loadClusters(key){
	var url="/newcluster";
	//var url ="/cluster";
		$.ajax({
			url:url,
			type:"GET",
			data:"key="+key,
			dataType:"json",
			success:function(data){
				console.log(data);
				var foamtree = new CarrotSearchFoamTree({
					id:"left",
					dataObject:{
						groups:data
					}
				});
			}
		});

}

function ajax_search_video(videoid){
	xmlHttpSearch = GetXmlHttpObject();
	if (xmlHttpSearch == null) {
		alert("Browser does not support HTTP Request");
		return;
	}
	var url = "../src/get_video_data.php";
	url = url + "?id=" + videoid;
	// console.log(url);
	video_Id = videoid;
	xmlHttpSearch.onreadystatechange = searchVideoCompleted;
	xmlHttpSearch.open("GET", url, true);
	xmlHttpSearch.send(null);

}
function toc(){
	toc_time = ["00:00:01", "00:04:47", "00:05:13", "00:07:37", "00:08:35", "00:09:39", "00:09:49", "00:13:21", "00:22:41", "00:25:08", "00:27:06", "00:27:29", "00:28:15", "00:28:45", "00:30:02", "00:31:09", "00:31:35", "00:32:58", "00:37:34", "00:39:10", "00:39:48"]
	toc_str = ["Data Science Stanford", "STRENGTH", "typical future data science problem", "The current state of data", "critical steps to achieve the vision", "How to generate relevant data?", "Mobile phones", "Satellite imagery", "Comparison with county averages", "One insight from this new dataset", "Approaches to getting ”big data”", "Interdisciplinary Team", "Focus on Poverty", "Advances in Pattern Recognition", "Transfer Learning Approach", "Our Model", "Learned Features", "Poverty Estimation", "Why does it work so well?", "High Resolution Poverty Maps", "Final thoughts"]

	for (i=0;i<toc_time.length;i++){
		var $chapter = $("<div>",{"class":"chapter","id":"chapter"+i.toString()});
		var $starttime = $("<div>",{"class":"starttime","text":toc_time[i]});
		var $headline = $("<div>",{"class":"headline","text":toc_str[i]});
		$chapter.append($starttime);
		$chapter.append($headline);
		$("#toc").append($chapter);
	}

}
function timeline(){
	wid = $("#timeline").css( "width" );
	wid = parseInt(wid.replace("px",""));
	hei = $("#timeline").css( "height" );
	hei = parseInt(hei.replace("px",""));



	for (i=0;i<slide_in_seg_arr.length;i++){
		temp = []
		for (j=0;j<slide_in_seg_arr[i].length-1;j++){
			console.log(slide_in_seg_arr[i][j])
			temp.push((slide_in_seg_arr[i][j+1]-slide_in_seg_arr[i][j])/30)
		}
		console.log(temp)
	}


	for (i = 0; i < sbd_arr.length; i++) { 
		sbd.push(sbd_arr[i]*wid/3428.0);
	}

	for (i = 0; i < slide_arr.length; i++) { 
		slide.push(slide_arr[i]*wid/3428.0);
	}


	for (i = 0; i < seg_arr.length; i++) { 
		seg.push(seg_arr[i]*wid/3428.0);
	}


	var svgContainer = d3.select("#timeline").append("svg")
	.attr("width", "100%")
	.attr("height", "100%")
	.attr("class", "timeline_svg");

	var rectangle = d3.select(".timeline_svg").selectAll("rect").data(sbd).enter().append("rect")
	.attr("x",function(d,i){return seg[i];})
	.attr("y",0)
	.attr("width",function(d,i){
		if (i === sbd_arr.length){
			return seg[i]
		}else{
			return seg[i+1]-seg[i];
		}
	})
	.attr("height",hei)
	.attr("class","rect")
	.on("mouseover",function(d,i){
		// d3.select(this).style("fill","rgba(228,95,86,0.5)");
		word_list = li[i];
		showNewWords(myWordCloud);
	})
	.on("mouseout",function(){
		// d3.select(this).style("fill","rgba(0,0,0,0.05)");
		word_list = frequency_list;
		showNewWords(myWordCloud);
	});

	var line = d3.select(".timeline_svg").selectAll("line").data(seg).enter().append("line")
	.attr("x1",function(d,i){return seg[i];})
	.attr("y1",0)
	.attr("x2",function(d,i){return seg[i];})
	.attr("y2",hei)
	.attr("stroke","#ccc")
	.attr("stroke-width",1);

	var circle = d3.select(".timeline_svg").selectAll("circle").data(slide).enter().append("circle")
	.attr("cx", function(d,i){return slide[i];})
	.attr("cy", hei/2.0)
	.attr("r", 2)
	.attr("class","circle");

}
function wordcloud2(){
	myWordCloud = wordCloud('#keywords');
	//Start cycling through the demo data
	word_list = frequency_list
	showNewWords(myWordCloud);



	// var data = [];

	// getData(); // popuate data 

}

function wordCloud(selector) {
	wid = $("#keywords").css( "width" );
	wid = parseInt(wid.replace("px",""));
	hei = $("#keywords").css( "height" );
	hei = parseInt(hei.replace("px",""));

	var fill = d3.scale.category20();

	//Construct the word cloud's SVG element
	var svg = d3.select(selector).append("svg")
	.attr("width", wid)
	.attr("height", hei)
	.append("g")
	.attr("transform", "translate("+ wid/2.0+","+hei/2.0+")");


	//Draw the word cloud
	function draw(words) {
		var cloud = svg.selectAll("g text")
		.data(words, function(d) { return d.text; })

		//Entering words
		cloud.enter()
		.append("text")
		// .style("font-family", "Trebuchet MS")
		.style("fill", function(d, i) { return "#333"; })
		.attr("text-anchor", "middle")
		.attr('font-size', 1)
		.attr("class","text")
		.text(function(d) { return d.text; })
		.on("mouseover",function(d){
			d3.select(this).style("fill","rgb(206, 189, 119)");
			tag = d3.select(this).text();
			wa = wave[tag].replace("[ ","").replace(" ]","").split(" ");
			console.log(wa);

			int_wa = [];
			max_wa = 0;
			min_wa =100;
			for (i=0;i<wa.length;i++){
				value = parseInt(wa[i]);
				if (value > max_wa){
					max_wa = value;
				}
				if (value<min_wa){
					min_wa = value;
				}
				int_wa.push(parseInt(wa[i]));
			}

			console.log(max_wa);
			var wa2 = []
			for(i=0;i<seg.length-1;i++){
				a = seg[i]/2;
				rx = (seg[i+1]-seg[i])/2.0;
				cx = rx + seg[i];
				if (max_wa-int_wa != 0){
					ry = 1+(int_wa[i]-min_wa)*10.0/(max_wa-min_wa);
				}
				else if (max_wa==0){
					ry = 0
				}
				else{
					ry = 12.5;
				}

				draw_ellipse(cx,parseInt($("#timeline").css( "height" ).replace("px",""))/2.0,rx,ry)
				// draw_wave(a,b,x);
			}

			for(key in ocr){
				if(ocr[key].toLowerCase().includes(d.text.toLowerCase())){
					console.log(key);
					d3.select("#slide"+key).style("border","1px solid rgb(206, 189, 119)");
				}
			}
			for(i=0;i<toc_str.length;i++){
				if(toc_str[i].toLowerCase().includes(d.text.toLowerCase())){
					d3.select("#chapter"+i.toString()).style("background","rgba(206, 189, 119,0.5)");
				}
			}


		})
		.on("mouseout",function(){
			d3.select(this).style("fill","#333");
			d3.select(".timeline_svg").selectAll("ellipse").remove();
			d3.selectAll(".slide").style("border","1px solid #ccc");
			d3.selectAll(".chapter").style("background","white");

		});

		//Entering and existing words
		cloud
		.transition()
		// .duration(50)
		.style("font-size", function(d) { 
			return d.size + "px"; 
			// if (d.size>1){
			//     return 15+d.size + "px"; 
			// }else{
			//      return 0 + "px";
			// }

		})
		.attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(0)";
		})
		.style("fill-opacity", 1);

		//Exiting words
		cloud.exit()
		.transition()
		.duration(0)
		.style('fill-opacity', 1e-6)
		.attr('font-size', 1)
		.remove();
	}


	//Use the module pattern to encapsulate the visualisation code. We'll
	// expose only the parts that need to be public.
	return {

		//Recompute the word cloud for a new set of words. This method will
		// asycnhronously call draw when the layout has been computed.
		//The outside world will need to call this function, so make it part
		// of the wordCloud return value.
		update: function(words) {
			d3.layout.cloud().size([wid, 90])
			.words(words)
			.padding(3)
			.rotate(0)
			.font("Cambria")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();
		}
	}

}
//frequency_list = [{"text":"shot","size":1}, {"text":"global","size":1}, {"text":"dollar","size":1}, {"text":"focus","size":1}, {"text":"month","size":1}, {"text":"earth","size":1}, {"text":"personal","size":1}, {"text":"environment","size":2}, {"text":"bigger","size":1}, {"text":"main","size":1}, {"text":"worth","size":1}, {"text":"food","size":2}, {"text":"propose","size":1}, {"text":"couple","size":1}, {"text":"number","size":1}, {"text":"game","size":1}, {"text":"bit","size":1}, {"text":"association","size":1}, {"text":"term","size":1}, {"text":"success","size":1}, {"text":"yield","size":1}, {"text":"magnitude","size":1}, {"text":"team","size":1}, {"text":"security","size":2}, {"text":"people","size":2}, {"text":"series","size":2}, {"text":"hard","size":1}, {"text":"crop","size":2}, {"text":"result","size":1}, {"text":"year","size":1}, {"text":"logo","size":1}, {"text":"postdoc","size":1}, {"text":"subject","size":2}, {"text":"category","size":1}, {"text":"publish","size":1}, {"text":"research","size":2}, {"text":"state","size":1}, {"text":"medicine","size":1}, {"text":"surprise","size":1}, {"text":"warrior","size":2}, {"text":"associate","size":1}, {"text":"importance","size":1}, {"text":"friday","size":1}, {"text":"phd","size":1}, {"text":"guy","size":1}, {"text":"change","size":2}, {"text":"climate","size":3}, {"text":"study","size":2}, {"text":"experience","size":1}, {"text":"david","size":5}, {"text":"thing","size":1}, {"text":"major","size":3}, {"text":"point","size":1}, {"text":"africa","size":1}, {"text":"scene","size":1}, {"text":"undergraduate","size":1}, {"text":"size","size":1}, {"text":"guess","size":1}, {"text":"data","size":8}, {"text":"question","size":3}, {"text":"system","size":2}, {"text":"priority","size":2}, {"text":"house","size":2}, {"text":"white","size":2}, {"text":"today","size":3}, {"text":"sort","size":2}, {"text":"allah","size":1}, {"text":"mariano","size":1}, {"text":"thousand","size":1}, {"text":"environmental","size":1}, {"text":"part","size":1}, {"text":"effort","size":1}, {"text":"case","size":1}, {"text":"kind","size":5}, {"text":"stanford","size":5}, {"text":"science","size":8}, {"text":"anticipate","size":1}, {"text":"work","size":1}, {"text":"air","size":1}, {"text":"project","size":3}, {"text":"suppose","size":1}, {"text":"hand","size":1}, {"text":"funders","size":1}, {"text":"website","size":1}, {"text":"crazy","size":1}, {"text":"shame","size":1}, {"text":"seminar","size":1}, {"text":"funny","size":1}, {"text":"strength","size":1}, {"text":"goal","size":1}, {"text":"graduate","size":1}, {"text":"application","size":1}, {"text":"speaker","size":3}, {"text":"build","size":1}, {"text":"agricultural","size":1}, {"text":"information","size":1}, {"text":"nod","size":1}, {"text":"stay","size":2}, {"text":"director","size":2}, {"text":"student","size":1}, {"text":"faculty","size":1}, {"text":"opportunity","size":1}, {"text":"co-opted","size":1}, {"text":"professor","size":1}, {"text":"fact","size":1}, {"text":"time","size":1}, {"text":"alright","size":1}, {"text":"pleasure","size":1}, {"text":"model","size":1}, {"text":"order","size":1}, {"text":"talk","size":4}];
//frequency_list = [ {"text":"environment","size":2},  {"text":"food","size":2} , {"text":"security","size":2}, {"text":"people","size":2}, {"text":"application","size":1}, {"text":"speaker","size":3},  {"text":"stay","size":2}, {"text":"director","size":2}, {"text":"talk","size":4}];
function showNewWords(vis, i) {
	i = i || 0;
	vis.update(word_list)
	// setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}

function draw_ellipse(cx,cy,rx,ry){
	console.log(cx,cy,rx,ry)
	d3.select("#timeline").select(".timeline_svg").append("ellipse")
	.attr("cx",cx)
	.attr("cy",cy)
	.attr("rx",rx)
	.attr("ry",ry)
	.attr("class","ellipse");
}

function searchVideoCompleted() {
	// $('#divPager').remove();
	if (xmlHttpSearch.readyState == 4 || xmlHttpSearch.readyState == "complete") {
		var response = eval("(" + xmlHttpSearch.responseText + ")");

		$(".spinner").css("display","none");
		// $("#video_panel").append("helloworld!");
		$("#video_player").attr("src", "http://www.youtube.com/embed/"+video_Id);
		toc();
		timeline();
		wordcloud2();

	}
}


function time_To_hhmmss(seconds){
	var hh;
	var mm;
	var ss;
	//传入的时间为空或小于0
	if(seconds==null||seconds<0){
		return;
	}
	//得到小时
	hh=seconds/3600|0;
	seconds=parseInt(seconds)-hh*3600;
	if(parseInt(hh)<10){
		hh="0"+hh;
	}
	//得到分
	mm=seconds/60|0;
	//得到秒
	ss=parseInt(seconds)-mm*60;
	if(parseInt(mm)<10){
		mm="0"+mm;    
	}
	if(ss<10){
		ss="0"+ss;      
	}
	return hh+":"+mm+":"+ss;
}
//console.log($("#expenddiv").text());

//$("#expenddiv").on("click",function(){
//console.log("url");
//xmlHttpSearch = GetXmlHttpObject();
//if (xmlHttpSearch == null) {
//alert("Browser does not support HTTP Request");
//return;
//}
//var url = "src/channel_search.php";
//console.log(url);
//xmlHttpSearch.onreadystatechange = searchchannelCompleted;
//xmlHttpSearch.open("GET", url, true);
//xmlHttpSearch.send(null);
//})
//function searchchannelCompleted() {
////$('#divPager').remove();
//if (xmlHttpSearch.readyState == 4 || xmlHttpSearch.readyState == "complete") {
//var response = eval("(" + xmlHttpSearch.responseText + ")");
////var total = response.total;
//console.log(response)
////$('#videocnt').text(total);
//}
//}