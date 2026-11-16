// 月亮妈妈 영어 100일 — 수업 내용 파일
// 새 수업을 추가할 때는 이 파일만 바꿔서 다시 올리면 됩니다.
window.LESSONS = [
  {
    day: 1,
    title: "인사하기",
    situation: "아침에 외국인을 만났을 때 인사하고 이름을 말해요.",
    words: [
      { en: "hello", pron: "헬로", ko: "안녕하세요", zh: "你好" },
      { en: "morning", pron: "모닝", ko: "아침", zh: "早上" },
      { en: "name", pron: "네임", ko: "이름", zh: "名字" },
      { en: "nice", pron: "나이스", ko: "좋은, 반가운", zh: "好的，愉快的" },
      { en: "meet", pron: "밋", ko: "만나다", zh: "见面" }
    ],
    sentences: [
      { en: "Good morning, how are you?", pron: "굿 모닝, 하우 아 유?", ko: "좋은 아침이에요, 잘 지내세요?" },
      { en: "I'm fine, thank you.", pron: "아임 파인, 땡큐.", ko: "잘 지내요, 고마워요." },
      { en: "My name is Luna.", pron: "마이 네임 이즈 루나.", ko: "제 이름은 루나예요." }
    ],
    challenge: { en: "Nice to meet you, too.", pron: "나이스 투 밋 츄, 투.", ko: "저도 만나서 반가워요." },
    grammar: "<b>I'm = I am</b> (나는 ~이다). 말할 때는 거의 항상 줄여서 <b>I'm</b>(아임)이라고 해요. 중국어 '我是'와 비슷하지만, 영어는 '괜찮다(fine)' 같은 상태에도 am을 써요 → I'm fine.",
    dialogue: [
      { who: "A", en: "Good ___, how are you?", answer: "morning" },
      { who: "B", en: "I'm ___, thank you. And you?", answer: "fine" },
      { who: "A", en: "I'm good. My ___ is Tom.", answer: "name" },
      { who: "B", en: "My name is Luna.", answer: "" },
      { who: "A", en: "Nice to ___ you, Luna.", answer: "meet" },
      { who: "B", en: "Nice to meet you, ___.", answer: "too" }
    ],
    quizLabel: "오늘 확인 퀴즈",
    quiz: [
      { q: "'좋은 아침이에요'를 영어로?", a: "Good morning." },
      { q: "'잘 지내요, 고마워요'를 영어로?", a: "I'm fine, thank you." },
      { q: "'저도 만나서 반가워요'를 영어로?", a: "Nice to meet you, too." }
    ]
  },
  {
    day: 2,
    title: "어디서 왔는지 말하기",
    situation: "자기소개에서 고향과 사는 곳을 말해요.",
    words: [
      { en: "from", pron: "프롬", ko: "~에서 (온)", zh: "来自" },
      { en: "live", pron: "리브", ko: "살다", zh: "住，生活" },
      { en: "China", pron: "차이나", ko: "중국", zh: "中国" },
      { en: "now", pron: "나우", ko: "지금", zh: "现在" },
      { en: "year", pron: "이어", ko: "해, 년", zh: "年" }
    ],
    sentences: [
      { en: "Where are you from?", pron: "웨어 아 유 프롬?", ko: "어디서 오셨어요?" },
      { en: "I am from China.", pron: "아이 엠 프롬 차이나.", ko: "저는 중국에서 왔어요." },
      { en: "I live in Seoul now.", pron: "아이 리브 인 서울 나우.", ko: "지금은 서울에 살아요." }
    ],
    challenge: { en: "I've lived in Korea for twenty years.", pron: "아이브 리브드 인 코리아 포 트웬티 이어즈.", ko: "한국에 산 지 20년 됐어요." },
    grammar: "<b>from</b> = 출신(어디에서 왔는지), <b>in</b> = 안에(어디에 있는지). 'from China'는 중국 출신, 'in Seoul'은 서울 안에 산다는 뜻이에요. 도전 문장의 <b>I've lived ... for 20 years</b>는 '과거부터 지금까지 쭉'이라는 뜻(통째로 외우기!).",
    dialogue: [
      { who: "A", en: "Where are you ___?", answer: "from" },
      { who: "B", en: "I am from ___.", answer: "China" },
      { who: "A", en: "Oh, nice! Do you ___ in Seoul?", answer: "live" },
      { who: "B", en: "Yes, I live in Seoul ___.", answer: "now" },
      { who: "A", en: "How long?", answer: "" },
      { who: "B", en: "I've lived in Korea for twenty ___.", answer: "years" }
    ],
    quizLabel: "Day 1 복습 퀴즈",
    quiz: [
      { q: "'잘 지내세요?'를 영어로?", a: "How are you?" },
      { q: "'제 이름은 루나예요'를 영어로?", a: "My name is Luna." },
      { q: "I'm은 무엇을 줄인 말?", a: "I am" }
    ]
  },
  {
    day: 3,
    title: "가족 소개하기",
    situation: "아이가 몇 명인지, 남편은 어느 나라 사람인지 말해요.",
    words: [
      { en: "daughter", pron: "도터", ko: "딸", zh: "女儿" },
      { en: "husband", pron: "허즈번드", ko: "남편", zh: "丈夫" },
      { en: "family", pron: "패밀리", ko: "가족", zh: "家庭" },
      { en: "three", pron: "쓰리", ko: "셋", zh: "三" },
      { en: "old", pron: "올드", ko: "나이가 ~인", zh: "（……）岁" }
    ],
    sentences: [
      { en: "I have three daughters.", pron: "아이 해브 쓰리 도터즈.", ko: "저는 딸이 셋 있어요." },
      { en: "My husband is Korean.", pron: "마이 허즈번드 이즈 코리안.", ko: "남편은 한국 사람이에요." },
      { en: "She is seven years old.", pron: "쉬 이즈 세븐 이어즈 올드.", ko: "그 아이는 일곱 살이에요." }
    ],
    challenge: { en: "My oldest daughter is in fifth grade.", pron: "마이 올디스트 도터 이즈 인 피프쓰 그레이드.", ko: "큰딸은 5학년이에요." },
    grammar: "<b>have</b> = 가지고 있다 (중국어 '有'). 둘 이상이면 끝에 <b>-s</b>를 붙여요 → daughter<b>s</b>. 나이는 <b>숫자 + years old</b>로 말해요.",
    dialogue: [
      { who: "A", en: "Do you have kids?", answer: "" },
      { who: "B", en: "Yes, I have three ___.", answer: "daughters" },
      { who: "A", en: "Wow! How ___ are they?", answer: "old" },
      { who: "B", en: "Twelve, seven and five.", answer: "" },
      { who: "A", en: "Is your ___ Chinese, too?", answer: "husband" },
      { who: "B", en: "No, my husband ___ Korean.", answer: "is" }
    ],
    quizLabel: "Day 2 복습 퀴즈",
    quiz: [
      { q: "'어디서 오셨어요?'를 영어로?", a: "Where are you from?" },
      { q: "'지금은 서울에 살아요'를 영어로?", a: "I live in Seoul now." },
      { q: "출신을 말할 때 쓰는 단어: in / from ?", a: "from" }
    ]
  },
  {
    day: 4,
    title: "학교 선생님과 인사",
    situation: "아이 학교의 원어민 선생님께 인사하고 아이가 어떻게 지내는지 물어요.",
    words: [
      { en: "teacher", pron: "티처", ko: "선생님", zh: "老师" },
      { en: "class", pron: "클래스", ko: "수업, 반", zh: "课，班" },
      { en: "mom", pron: "맘", ko: "엄마", zh: "妈妈" },
      { en: "help", pron: "헬프", ko: "도움, 돕다", zh: "帮助" },
      { en: "doing", pron: "두잉", ko: "지내고 있는", zh: "（过得）怎么样" }
    ],
    sentences: [
      { en: "Hi, I'm Sora's mom.", pron: "하이, 아임 소라즈 맘.", ko: "안녕하세요, 소라 엄마예요." },
      { en: "How is she doing in class?", pron: "하우 이즈 쉬 두잉 인 클래스?", ko: "아이가 수업에서 어떻게 지내요?" },
      { en: "Thank you for your help.", pron: "땡큐 포 유어 헬프.", ko: "도와주셔서 감사해요." }
    ],
    challenge: { en: "Please let me know if there's a problem.", pron: "플리즈 렛 미 노우 이프 데어즈 어 프라블럼.", ko: "문제가 있으면 알려주세요." },
    grammar: "<b>이름 + 's</b> = ~의. Sora's mom = 소라의 엄마 (실제로 말할 땐 우리 아이 이름으로 바꿔요). <b>How is she doing?</b>은 '요즘 어떻게 지내요?'라는 자주 쓰는 통문장이에요.",
    dialogue: [
      { who: "B", en: "Hi, I'm Sora's ___.", answer: "mom" },
      { who: "A", en: "Oh, hello! I'm her English ___.", answer: "teacher" },
      { who: "B", en: "How is she doing in ___?", answer: "class" },
      { who: "A", en: "She's doing great. She talks a lot!", answer: "" },
      { who: "B", en: "Thank you for your ___.", answer: "help" },
      { who: "A", en: "You're welcome. See you!", answer: "" }
    ],
    quizLabel: "Day 3 복습 퀴즈",
    quiz: [
      { q: "'저는 딸이 셋 있어요'를 영어로?", a: "I have three daughters." },
      { q: "'남편은 한국 사람이에요'를 영어로?", a: "My husband is Korean." },
      { q: "'그 아이는 일곱 살이에요'를 영어로?", a: "She is seven years old." }
    ]
  },
  {
    day: 5,
    title: "아이 사정 알리기",
    situation: "아이가 아프거나 늦을 때 선생님께 알려요.",
    words: [
      { en: "sick", pron: "씩", ko: "아픈", zh: "生病" },
      { en: "late", pron: "레이트", ko: "늦은", zh: "迟到，晚" },
      { en: "early", pron: "얼리", ko: "일찍", zh: "早" },
      { en: "pick up", pron: "픽 업", ko: "(아이를) 데리러 가다", zh: "接（孩子）" },
      { en: "fever", pron: "피버", ko: "열", zh: "发烧" }
    ],
    sentences: [
      { en: "She is sick today.", pron: "쉬 이즈 씩 투데이.", ko: "아이가 오늘 아파요." },
      { en: "She will be late today.", pron: "쉬 윌 비 레이트 투데이.", ko: "아이가 오늘 늦을 거예요." },
      { en: "I'll pick her up early.", pron: "아일 픽 허 럽 얼리.", ko: "제가 일찍 데리러 갈게요." }
    ],
    challenge: { en: "She has a fever, so she'll stay home.", pron: "쉬 해즈 어 피버, 쏘 쉴 스테이 홈.", ko: "열이 있어서 집에 있을 거예요." },
    grammar: "<b>will</b> = ~할 거예요(미래, 중국어 '会/要'). I will → <b>I'll</b>(아일), she will → <b>she'll</b>(쉴)로 줄여 말해요. pick up 사이에 사람을 넣어요 → pick <b>her</b> up.",
    dialogue: [
      { who: "B", en: "Good morning. Sora is ___ today.", answer: "sick" },
      { who: "A", en: "Oh no! What's wrong?", answer: "" },
      { who: "B", en: "She has a ___.", answer: "fever" },
      { who: "A", en: "I'm sorry. Will she come tomorrow?", answer: "" },
      { who: "B", en: "Yes, but she ___ be late.", answer: "will" },
      { who: "A", en: "That's okay. Thank you for telling me.", answer: "" }
    ],
    quizLabel: "Day 4 복습 퀴즈",
    quiz: [
      { q: "'아이가 수업에서 어떻게 지내요?'를 영어로?", a: "How is she doing in class?" },
      { q: "'도와주셔서 감사해요'를 영어로?", a: "Thank you for your help." },
      { q: "'문제가 있으면 알려주세요'를 영어로?", a: "Please let me know if there's a problem." }
    ]
  },
  {
    day: 6,
    title: "카페에서 주문하기",
    situation: "카페에서 음료를 주문하고 크기, 포장 여부를 말해요.",
    words: [
      { en: "iced", pron: "아이스트", ko: "차가운(얼음 넣은)", zh: "冰的" },
      { en: "hot", pron: "핫", ko: "뜨거운", zh: "热的" },
      { en: "small", pron: "스몰", ko: "작은", zh: "小的" },
      { en: "take", pron: "테이크", ko: "가져가다", zh: "拿，带走" },
      { en: "please", pron: "플리즈", ko: "~주세요", zh: "请" }
    ],
    sentences: [
      { en: "Can I get an iced latte?", pron: "캔 아이 겟 언 아이스트 라테이?", ko: "아이스 라테 한 잔 주시겠어요?" },
      { en: "A small one, please.", pron: "어 스몰 원, 플리즈.", ko: "작은 걸로 주세요." },
      { en: "I'll take it to go.", pron: "아일 테이킷 투 고.", ko: "포장해 갈게요." }
    ],
    challenge: { en: "Could I have it with oat milk?", pron: "쿠다이 해빗 위드 오트 밀크?", ko: "오트 우유로 해주실 수 있어요?" },
    grammar: "<b>Can I get ~?</b> = ~ 주실래요? 주문할 때 제일 많이 쓰는 틀이에요. 더 공손하게 말하고 싶으면 <b>Could I have ~?</b>. 매장에서 먹을 땐 <b>For here</b>, 포장은 <b>To go</b>.",
    dialogue: [
      { who: "A", en: "Hi, what can I get for you?", answer: "" },
      { who: "B", en: "___ I get an iced latte?", answer: "Can" },
      { who: "A", en: "Sure. What size?", answer: "" },
      { who: "B", en: "A ___ one, please.", answer: "small" },
      { who: "A", en: "For here or to go?", answer: "" },
      { who: "B", en: "I'll take it to ___.", answer: "go" }
    ],
    quizLabel: "Day 5 복습 퀴즈",
    quiz: [
      { q: "'아이가 오늘 아파요'를 영어로?", a: "She is sick today." },
      { q: "'제가 일찍 데리러 갈게요'를 영어로?", a: "I'll pick her up early." },
      { q: "she will을 줄이면?", a: "she'll (쉴)" }
    ]
  },
  {
    day: 7,
    title: "식당에서",
    situation: "식당에서 자리를 부탁하고, 맵기를 묻고, 계산해요.",
    words: [
      { en: "table", pron: "테이블", ko: "테이블, 자리", zh: "桌子，座位" },
      { en: "dish", pron: "디쉬", ko: "요리", zh: "菜" },
      { en: "spicy", pron: "스파이시", ko: "매운", zh: "辣的" },
      { en: "water", pron: "워러", ko: "물", zh: "水" },
      { en: "check", pron: "첵", ko: "계산서", zh: "账单，买单" }
    ],
    sentences: [
      { en: "A table for four, please.", pron: "어 테이블 포 포, 플리즈.", ko: "네 명 자리 부탁해요." },
      { en: "Is this dish spicy?", pron: "이즈 디스 디쉬 스파이시?", ko: "이 요리 매워요?" },
      { en: "Can we get the check?", pron: "캔 위 겟 더 첵?", ko: "계산서 주시겠어요?" }
    ],
    challenge: { en: "Could you make it less spicy for my kids?", pron: "쿠쥬 메이킷 레스 스파이시 포 마이 키즈?", ko: "아이들 먹게 덜 맵게 해주실 수 있나요?" },
    grammar: "질문 만들기: <b>be동사(is)를 맨 앞으로</b>. This dish is spicy.(맵다) → <b>Is</b> this dish spicy?(맵나요?) 중국어처럼 끝에 '吗'를 붙이는 대신 순서를 바꿔요.",
    dialogue: [
      { who: "B", en: "Hi, a ___ for four, please.", answer: "table" },
      { who: "A", en: "This way, please.", answer: "" },
      { who: "B", en: "Is this dish ___?", answer: "spicy" },
      { who: "A", en: "Yes, a little.", answer: "" },
      { who: "B", en: "Can we have some ___, too?", answer: "water" },
      { who: "B", en: "(식사 후) Can we get the ___?", answer: "check" }
    ],
    quizLabel: "Day 6 복습 퀴즈",
    quiz: [
      { q: "'아이스 라테 한 잔 주시겠어요?'를 영어로?", a: "Can I get an iced latte?" },
      { q: "'포장해 갈게요'를 영어로?", a: "I'll take it to go." },
      { q: "매장에서 먹을 때는? (For here / To go)", a: "For here" }
    ]
  },
  {
    day: 8,
    title: "길 묻기",
    situation: "여행지에서 지하철역이나 화장실이 어디 있는지 물어요.",
    words: [
      { en: "where", pron: "웨어", ko: "어디", zh: "哪里" },
      { en: "station", pron: "스테이션", ko: "역", zh: "车站" },
      { en: "near", pron: "니어", ko: "가까이", zh: "附近" },
      { en: "far", pron: "파", ko: "먼", zh: "远" },
      { en: "restroom", pron: "레스트룸", ko: "화장실", zh: "洗手间" }
    ],
    sentences: [
      { en: "Where is the subway station?", pron: "웨어 이즈 더 서브웨이 스테이션?", ko: "지하철역이 어디예요?" },
      { en: "Is it far from here?", pron: "이즈 잇 파 프롬 히어?", ko: "여기서 멀어요?" },
      { en: "How do I get there?", pron: "하우 두 아이 겟 데어?", ko: "거기 어떻게 가요?" }
    ],
    challenge: { en: "Excuse me, is there a restroom near here?", pron: "익스큐즈 미, 이즈 데어 러 레스트룸 니어 히어?", ko: "실례지만 이 근처에 화장실 있나요?" },
    grammar: "<b>Is there ~?</b> = ~가 있나요? (중국어 '有……吗?'). 물건이나 장소가 '있는지' 물을 때 써요. <b>Excuse me</b>로 시작하면 모르는 사람에게도 공손해요.",
    dialogue: [
      { who: "B", en: "___ me. Where is the subway station?", answer: "Excuse" },
      { who: "A", en: "It's on Main Street.", answer: "" },
      { who: "B", en: "Is it ___ from here?", answer: "far" },
      { who: "A", en: "No, it's very ___.", answer: "near" },
      { who: "B", en: "How do I get ___?", answer: "there" },
      { who: "A", en: "Just walk that way.", answer: "" }
    ],
    quizLabel: "Day 7 복습 퀴즈",
    quiz: [
      { q: "'네 명 자리 부탁해요'를 영어로?", a: "A table for four, please." },
      { q: "'이 요리 매워요?'를 영어로?", a: "Is this dish spicy?" },
      { q: "'계산서 주시겠어요?'를 영어로?", a: "Can we get the check?" }
    ]
  },
  {
    day: 9,
    title: "길 알려주기",
    situation: "길을 묻는 외국인 손님에게 방향을 알려줘요.",
    words: [
      { en: "straight", pron: "스트레이트", ko: "곧장", zh: "直走" },
      { en: "left", pron: "레프트", ko: "왼쪽", zh: "左边" },
      { en: "right", pron: "라이트", ko: "오른쪽", zh: "右边" },
      { en: "corner", pron: "코너", ko: "모퉁이", zh: "拐角" },
      { en: "minute", pron: "미닛", ko: "분", zh: "分钟" }
    ],
    sentences: [
      { en: "Go straight for two blocks.", pron: "고 스트레이트 포 투 블락스.", ko: "두 블록 직진하세요." },
      { en: "Turn left at the corner.", pron: "턴 레프트 앳 더 코너.", ko: "모퉁이에서 왼쪽으로 도세요." },
      { en: "It takes five minutes on foot.", pron: "잇 테익스 파이브 미닛츠 온 풋.", ko: "걸어서 5분 걸려요." }
    ],
    challenge: { en: "I'm going that way, I'll show you.", pron: "아임 고잉 댓 웨이, 아일 쇼 유.", ko: "저도 그쪽으로 가요, 안내해 드릴게요." },
    grammar: "길 안내는 <b>동사로 바로 시작</b>해요(명령문). <b>Go</b> straight / <b>Turn</b> left. 주어(You)를 빼도 무례하지 않아요. 걸어서 = <b>on foot</b>.",
    dialogue: [
      { who: "A", en: "Excuse me, where is the palace?", answer: "" },
      { who: "B", en: "Go ___ for two blocks.", answer: "straight" },
      { who: "A", en: "Two blocks. Then?", answer: "" },
      { who: "B", en: "Turn ___ at the corner.", answer: "left" },
      { who: "A", en: "Is it far?", answer: "" },
      { who: "B", en: "It takes five ___ on foot.", answer: "minutes" }
    ],
    quizLabel: "Day 8 복습 퀴즈",
    quiz: [
      { q: "'지하철역이 어디예요?'를 영어로?", a: "Where is the subway station?" },
      { q: "'거기 어떻게 가요?'를 영어로?", a: "How do I get there?" },
      { q: "'이 근처에 화장실 있나요?'를 영어로?", a: "Is there a restroom near here?" }
    ]
  },
  {
    day: 10,
    title: "나의 일상 말하기 (말하기 시험 맛보기)",
    situation: "말하기 시험의 단골 질문 '주말에 뭐 해요?'에 3문장으로 답해요.",
    words: [
      { en: "weekend", pron: "위켄드", ko: "주말", zh: "周末" },
      { en: "usually", pron: "유주얼리", ko: "보통", zh: "通常" },
      { en: "cook", pron: "쿡", ko: "요리하다", zh: "做饭" },
      { en: "like", pron: "라이크", ko: "좋아하다", zh: "喜欢" },
      { en: "park", pron: "파크", ko: "공원", zh: "公园" }
    ],
    sentences: [
      { en: "I usually cook at home.", pron: "아이 유주얼리 쿡 앳 홈.", ko: "저는 보통 집에서 요리해요." },
      { en: "We go out on weekends.", pron: "위 고 아웃 온 위켄즈.", ko: "주말에는 밖에 나가요." },
      { en: "I like going to the park.", pron: "아이 라이크 고잉 투 더 파크.", ko: "공원 가는 걸 좋아해요." }
    ],
    challenge: { en: "Let me tell you about my weekend.", pron: "렛 미 텔 유 어바웃 마이 위켄드.", ko: "제 주말에 대해 말씀드릴게요." },
    grammar: "<b>usually(보통)</b>는 동사 <b>앞</b>에 넣어요 → I <b>usually</b> cook. 말하기 시험은 '첫 문장 + 이유/예시 + 느낌' 3단계면 충분해요. 오늘 문장 3개를 이어 말하면 바로 답변 하나가 완성돼요!",
    dialogue: [
      { who: "A", en: "What do you do on ___?", answer: "weekends" },
      { who: "B", en: "Let me tell you about my weekend.", answer: "" },
      { who: "B", en: "I ___ cook at home in the morning.", answer: "usually" },
      { who: "B", en: "In the afternoon, we go ___.", answer: "out" },
      { who: "B", en: "I like going to the ___ with my kids.", answer: "park" },
      { who: "A", en: "That sounds nice!", answer: "" }
    ],
    quizLabel: "Day 1~9 총복습 퀴즈",
    quiz: [
      { q: "'두 블록 직진하세요'를 영어로?", a: "Go straight for two blocks." },
      { q: "'모퉁이에서 왼쪽으로 도세요'를 영어로?", a: "Turn left at the corner." },
      { q: "(Day 2) '저는 중국에서 왔어요'를 영어로?", a: "I am from China." },
      { q: "(Day 5) '아이가 오늘 늦을 거예요'를 영어로?", a: "She will be late today." },
      { q: "(Day 6) '작은 걸로 주세요'를 영어로?", a: "A small one, please." }
    ]
  },
  {
    day: 11,
    title: "상태 말하기 ① 기분·몸 상태",
    situation: "누가 '괜찮아요?' 하고 물을 때 지금 내 상태를 말해요.",
    words: [
      { en: "tired", pron: "타이어드", ko: "피곤한", zh: "累" },
      { en: "hungry", pron: "헝그리", ko: "배고픈", zh: "饿" },
      { en: "busy", pron: "비지", ko: "바쁜", zh: "忙" },
      { en: "happy", pron: "해피", ko: "행복한, 기쁜", zh: "开心" },
      { en: "a little", pron: "어 리틀", ko: "조금", zh: "一点儿" }
    ],
    sentences: [
      { en: "I'm a little tired today.", pron: "아임 어 리틀 타이어드 투데이.", ko: "오늘 조금 피곤해요." },
      { en: "She is very hungry now.", pron: "쉬 이즈 베리 헝그리 나우.", ko: "아이가 지금 아주 배고파요." },
      { en: "We are busy this week.", pron: "위 아 비지 디스 위크.", ko: "우리는 이번 주에 바빠요." }
    ],
    challenge: { en: "I'm tired, but I'm happy.", pron: "아임 타이어드, 벗 아임 해피.", ko: "피곤하지만 행복해요." },
    grammar: "영어로 말하기 전에 먼저 하나만 골라요: <b>상태</b>인가, <b>행동</b>인가? 상태는 <b>am / are / is</b>를 써요. <b>I am</b> · <b>You/We/They are</b> · <b>He/She is</b>. 그 뒤에 기분·상태 말을 붙이면 끝! 중국어 '我很累'에는 是가 없지만, 영어는 <b>am이 꼭 필요</b>해요 → I tired ❌ / I<b>'m</b> tired ⭕",
    dialogue: [
      { who: "A", en: "You look tired. Are you okay?", answer: "" },
      { who: "B", en: "I'm a little ___ today.", answer: "tired" },
      { who: "A", en: "Are you ___ this week?", answer: "busy" },
      { who: "B", en: "Yes, we ___ very busy.", answer: "are" },
      { who: "A", en: "Let's have lunch. Are you ___?", answer: "hungry" },
      { who: "B", en: "Yes! I'm ___ now.", answer: "happy" }
    ],
    quizLabel: "Day 10 복습 퀴즈",
    quiz: [
      { q: "'저는 보통 집에서 요리해요'를 영어로?", a: "I usually cook at home." },
      { q: "'주말에는 밖에 나가요'를 영어로?", a: "We go out on weekends." },
      { q: "usually는 동사 앞에 넣을까요, 뒤에 넣을까요?", a: "앞 (I usually cook.)" }
    ]
  },
  {
    day: 12,
    title: "상태 말하기 ② 누구인지 말하기",
    situation: "나와 아이, 이웃이 어떤 사람인지 소개해요.",
    words: [
      { en: "mom", pron: "맘", ko: "엄마", zh: "妈妈" },
      { en: "student", pron: "스튜던트", ko: "학생", zh: "学生" },
      { en: "friend", pron: "프렌드", ko: "친구", zh: "朋友" },
      { en: "neighbor", pron: "네이버", ko: "이웃", zh: "邻居" },
      { en: "elementary", pron: "엘리멘터리", ko: "초등의", zh: "小学的" }
    ],
    sentences: [
      { en: "I'm a mom of three.", pron: "아임 어 맘 오브 쓰리.", ko: "저는 세 아이의 엄마예요." },
      { en: "She is an elementary school student.", pron: "쉬 이즈 언 엘리멘터리 스쿨 스튜던트.", ko: "아이는 초등학생이에요." },
      { en: "We are good friends.", pron: "위 아 굿 프렌즈.", ko: "우리는 좋은 친구예요." }
    ],
    challenge: { en: "He is my neighbor and my friend.", pron: "히 이즈 마이 네이버 앤 마이 프렌드.", ko: "그분은 제 이웃이자 친구예요." },
    grammar: "상태 두 번째 모양: <b>am / are / is + 사람·사물 이름</b>. 중국어 '我<b>是</b>妈妈'의 是와 같은 자리예요. 한 명일 때는 앞에 <b>a</b>를 붙여요 → <b>a</b> mom, <b>a</b> student. 아/에/이/오/우 소리로 시작하면 <b>an</b> → <b>an</b> elementary school student. 여러 명은 a 없이 끝에 s → friend<b>s</b>.",
    dialogue: [
      { who: "A", en: "Is she your daughter?", answer: "" },
      { who: "B", en: "Yes. She is an elementary school ___.", answer: "student" },
      { who: "A", en: "Who is he?", answer: "" },
      { who: "B", en: "He is my ___, Mr. Kim.", answer: "neighbor" },
      { who: "A", en: "Are you good ___?", answer: "friends" },
      { who: "B", en: "Yes, we are. And I'm a ___ of three!", answer: "mom" }
    ],
    quizLabel: "Day 11 복습 퀴즈",
    quiz: [
      { q: "'오늘 조금 피곤해요'를 영어로?", a: "I'm a little tired today." },
      { q: "'아이가 지금 아주 배고파요'를 영어로?", a: "She is very hungry now." },
      { q: "She 뒤에는 am / are / is 중 무엇?", a: "is (She is ~)" }
    ]
  },
  {
    day: 13,
    title: "상태 말하기 ③ 어디에 있는지 말하기",
    situation: "전화로 '지금 어디예요?' 하고 물을 때 답해요.",
    words: [
      { en: "at", pron: "앳", ko: "~에 (그 곳에)", zh: "在" },
      { en: "office", pron: "오피스", ko: "사무실", zh: "办公室" },
      { en: "kitchen", pron: "키친", ko: "부엌", zh: "厨房" },
      { en: "outside", pron: "아웃사이드", ko: "밖에", zh: "外面" },
      { en: "front", pron: "프런트", ko: "앞", zh: "前面" }
    ],
    sentences: [
      { en: "I'm at home right now.", pron: "아임 앳 홈 라잇 나우.", ko: "지금 집에 있어요." },
      { en: "She is at school today.", pron: "쉬 이즈 앳 스쿨 투데이.", ko: "아이는 오늘 학교에 있어요." },
      { en: "He is in the office.", pron: "히 이즈 인 디 오피스.", ko: "그는 사무실에 있어요." }
    ],
    challenge: { en: "I'm in front of the school.", pron: "아임 인 프런트 오브 더 스쿨.", ko: "학교 앞에 있어요." },
    grammar: "상태 세 번째 모양: <b>am / are / is + 장소</b>. 중국어 '我<b>在</b>家'의 在 = 영어는 <b>am + at</b>. <b>at</b>은 지도 위의 점처럼 '그 곳에'(at home, at school), <b>in</b>은 상자처럼 '그 안에'(in the kitchen, in Seoul). <b>in front of</b> = ~ 앞에 (통째로 외우기!).",
    dialogue: [
      { who: "A", en: "Hi! Are you at ___?", answer: "home" },
      { who: "B", en: "No, I'm ___ now.", answer: "outside" },
      { who: "A", en: "Where is your husband?", answer: "" },
      { who: "B", en: "He is in the ___.", answer: "office" },
      { who: "A", en: "And the kids?", answer: "" },
      { who: "B", en: "They are ___ school.", answer: "at" }
    ],
    quizLabel: "Day 12 복습 퀴즈",
    quiz: [
      { q: "'저는 세 아이의 엄마예요'를 영어로?", a: "I'm a mom of three." },
      { q: "'우리는 좋은 친구예요'를 영어로?", a: "We are good friends." },
      { q: "elementary school student 앞에는 a일까요, an일까요?", a: "an (an elementary school student)" }
    ]
  },
  {
    day: 14,
    title: "상태 말하기 ④ 지금 하는 중",
    situation: "'지금 뭐 해요?' 하고 물을 때 답해요.",
    words: [
      { en: "make", pron: "메이크", ko: "만들다", zh: "做" },
      { en: "dinner", pron: "디너", ko: "저녁밥", zh: "晚饭" },
      { en: "wait", pron: "웨이트", ko: "기다리다", zh: "等" },
      { en: "clean", pron: "클린", ko: "청소하다", zh: "打扫" },
      { en: "later", pron: "레이터", ko: "나중에", zh: "待会儿" }
    ],
    sentences: [
      { en: "I'm making dinner right now.", pron: "아임 메이킹 디너 라잇 나우.", ko: "지금 저녁 만드는 중이에요." },
      { en: "She is doing her homework.", pron: "쉬 이즈 두잉 허 홈워크.", ko: "아이는 숙제하는 중이에요." },
      { en: "We are waiting for the bus.", pron: "위 아 웨이팅 포 더 버스.", ko: "우리는 버스를 기다리는 중이에요." }
    ],
    challenge: { en: "I'm cleaning now, I'll call you later.", pron: "아임 클리닝 나우, 아일 콜 유 레이터.", ko: "지금 청소 중이라 나중에 전화할게요." },
    grammar: "상태 네 번째 모양: <b>am / are / is + 동사ing</b> = 지금 ~하는 중 (중국어 '<b>正在</b>'). 동사는 원래 모양 그대로는 am 뒤에 설 수 없어요 → I am make ❌ / I am mak<b>ing</b> ⭕. ing라는 옷을 입어야 같이 설 수 있어요. e로 끝나면 e를 빼고 ing → make → mak<b>ing</b>.",
    dialogue: [
      { who: "A", en: "Hi, what are you doing?", answer: "" },
      { who: "B", en: "I'm ___ dinner right now.", answer: "making" },
      { who: "A", en: "Where is your daughter?", answer: "" },
      { who: "B", en: "She is ___ her homework.", answer: "doing" },
      { who: "A", en: "Can you talk now?", answer: "" },
      { who: "B", en: "Sorry, I'll call you ___.", answer: "later" }
    ],
    quizLabel: "Day 13 복습 퀴즈",
    quiz: [
      { q: "'지금 집에 있어요'를 영어로?", a: "I'm at home right now." },
      { q: "'학교 앞에 있어요'를 영어로?", a: "I'm in front of the school." },
      { q: "'부엌에'는 at일까요, in일까요?", a: "in (in the kitchen)" }
    ]
  },
  {
    day: 15,
    title: "행동 말하기 (평소에 하는 일)",
    situation: "나와 가족이 평소에 무엇을 하는지 말해요.",
    words: [
      { en: "study", pron: "스터디", ko: "공부하다", zh: "学习" },
      { en: "work", pron: "워크", ko: "일하다", zh: "工作" },
      { en: "read", pron: "리드", ko: "읽다", zh: "读" },
      { en: "drink", pron: "드링크", ko: "마시다", zh: "喝" },
      { en: "every day", pron: "에브리 데이", ko: "매일", zh: "每天" }
    ],
    sentences: [
      { en: "I study English every day.", pron: "아이 스터디 잉글리시 에브리 데이.", ko: "저는 매일 영어를 공부해요." },
      { en: "She reads books at night.", pron: "쉬 리즈 북스 앳 나잇.", ko: "아이는 밤에 책을 읽어요." },
      { en: "My husband works in Seoul.", pron: "마이 허즈번드 웍스 인 서울.", ko: "남편은 서울에서 일해요." }
    ],
    challenge: { en: "I drink coffee and read every morning.", pron: "아이 드링크 커피 앤 리드 에브리 모닝.", ko: "저는 매일 아침 커피를 마시고 책을 읽어요." },
    grammar: "<b>행동</b>을 말할 때는 am/are/is를 <b>빼고</b> 동사를 바로 써요 → I study ⭕ / I am study ❌. He·She·남편·아이처럼 '다른 한 사람'이면 동사 끝에 <b>s</b> → She read<b>s</b>, He work<b>s</b>. 고르는 법: 피곤해(상태) = I<b>'m</b> tired / 공부해(행동) = I <b>study</b>.",
    dialogue: [
      { who: "A", en: "What do you do every day?", answer: "" },
      { who: "B", en: "I ___ English every day.", answer: "study" },
      { who: "A", en: "Wow! And your daughter?", answer: "" },
      { who: "B", en: "She ___ books at night.", answer: "reads" },
      { who: "A", en: "Does your husband work in Seoul?", answer: "" },
      { who: "B", en: "Yes, he ___ in Seoul.", answer: "works" }
    ],
    quizLabel: "Day 14 복습 퀴즈",
    quiz: [
      { q: "'지금 저녁 만드는 중이에요'를 영어로?", a: "I'm making dinner right now." },
      { q: "'우리는 버스를 기다리는 중이에요'를 영어로?", a: "We are waiting for the bus." },
      { q: "'I am make dinner'는 어디가 틀렸을까요?", a: "am 뒤에는 making (I am making dinner.)" }
    ]
  },
  {
    day: 16,
    title: "상태 물어보기 (Are you? / Is she?)",
    situation: "선생님께 전화해서 아이가 괜찮은지 물어봐요.",
    words: [
      { en: "okay", pron: "오케이", ko: "괜찮은", zh: "没事，还好" },
      { en: "ready", pron: "레디", ko: "준비된", zh: "准备好" },
      { en: "sleepy", pron: "슬리피", ko: "졸린", zh: "困" },
      { en: "here", pron: "히어", ko: "여기", zh: "这里" },
      { en: "still", pron: "스틸", ko: "아직", zh: "还" }
    ],
    sentences: [
      { en: "Are you ready for school?", pron: "아 유 레디 포 스쿨?", ko: "학교 갈 준비 됐니?" },
      { en: "Is she still at school?", pron: "이즈 쉬 스틸 앳 스쿨?", ko: "아이가 아직 학교에 있나요?" },
      { en: "Is the teacher here today?", pron: "이즈 더 티처 히어 투데이?", ko: "선생님 오늘 계신가요?" }
    ],
    challenge: { en: "Is she doing well in class?", pron: "이즈 쉬 두잉 웰 인 클래스?", ko: "아이가 수업에서 잘하고 있나요?" },
    grammar: "상태를 물을 때는 <b>am/are/is를 맨 앞으로</b> 보내요. She <b>is</b> at school. → <b>Is</b> she at school? 중국어는 끝에 吗를 붙이지만 영어는 자리를 바꿔요. 네 가지 모양 모두 똑같아요: <b>Are you</b> tired? / <b>Is he</b> your teacher? / <b>Is she</b> at school? / <b>Is she</b> doing well? 대답은 Yes, she is. / No, she isn't.",
    dialogue: [
      { who: "A", en: "Hello, this is Luna. Is she ___ at school?", answer: "still" },
      { who: "B", en: "Yes, she is ___ with me.", answer: "here" },
      { who: "A", en: "Is she ___?", answer: "okay" },
      { who: "B", en: "Yes, she is. She is a little ___.", answer: "sleepy" },
      { who: "A", en: "___ she doing well in class?", answer: "Is" },
      { who: "B", en: "Yes, she is doing very well!", answer: "" }
    ],
    quizLabel: "Day 15 복습 퀴즈",
    quiz: [
      { q: "'저는 매일 영어를 공부해요'를 영어로?", a: "I study English every day." },
      { q: "'남편은 서울에서 일해요'를 영어로?", a: "My husband works in Seoul." },
      { q: "She 뒤에 read를 쓰면 어떻게 바뀔까요?", a: "reads (She reads books.)" }
    ]
  },
  {
    day: 17,
    title: "행동 물어보기 (Do you? / Does she?)",
    situation: "선생님께 아이의 학교생활과 준비물을 물어봐요.",
    words: [
      { en: "speak", pron: "스피크", ko: "말하다", zh: "说" },
      { en: "eat", pron: "잇", ko: "먹다", zh: "吃" },
      { en: "need", pron: "니드", ko: "필요하다", zh: "需要" },
      { en: "bring", pron: "브링", ko: "가져오다", zh: "带来" },
      { en: "anything", pron: "애니씽", ko: "무엇이든, 뭔가", zh: "什么东西" }
    ],
    sentences: [
      { en: "Do you speak Korean?", pron: "두 유 스피크 코리안?", ko: "한국어 하세요?" },
      { en: "Does she eat lunch well?", pron: "더즈 쉬 잇 런치 웰?", ko: "아이가 점심 잘 먹나요?" },
      { en: "Do I need to bring anything?", pron: "두 아이 니드 투 브링 애니씽?", ko: "제가 뭐 가져가야 하나요?" }
    ],
    challenge: { en: "Does she get along with her friends?", pron: "더즈 쉬 겟 얼롱 위드 허 프렌즈?", ko: "아이가 친구들과 잘 지내나요?" },
    grammar: "행동을 물을 때는 맨 앞에 <b>Do</b>를 놓아요. You speak Korean. → <b>Do</b> you speak Korean? He/She일 때는 <b>Does</b>. 이때 동사의 s는 Does가 가져가서 동사는 원래 모양이에요 → <b>Does</b> she <b>eat</b> ⭕ / Does she eats ❌. 상태 질문(Are/Is)과 섞지 않기 → Are you speak ❌. 대답은 Yes, I do. / No, she doesn't.",
    dialogue: [
      { who: "A", en: "Excuse me, do you ___ Korean?", answer: "speak" },
      { who: "B", en: "Yes, a little.", answer: "" },
      { who: "A", en: "___ she eat lunch well?", answer: "Does" },
      { who: "B", en: "Yes, she does. She eats very well.", answer: "" },
      { who: "A", en: "Do I ___ to bring anything tomorrow?", answer: "need" },
      { who: "B", en: "Please ___ a water bottle.", answer: "bring" }
    ],
    quizLabel: "Day 16 복습 퀴즈",
    quiz: [
      { q: "'아이가 아직 학교에 있나요?'를 영어로?", a: "Is she still at school?" },
      { q: "'학교 갈 준비 됐니?'를 영어로?", a: "Are you ready for school?" },
      { q: "'She is okay.'를 질문으로 바꾸면?", a: "Is she okay?" }
    ]
  },
  {
    day: 18,
    title: "지난 상태 말하기 (was / were)",
    situation: "아이가 어제 결석한 이유를 선생님께 말해요.",
    words: [
      { en: "yesterday", pron: "예스터데이", ko: "어제", zh: "昨天" },
      { en: "last night", pron: "래스트 나잇", ko: "어젯밤", zh: "昨晚" },
      { en: "absent", pron: "앱슨트", ko: "결석한", zh: "缺席" },
      { en: "better", pron: "베터", ko: "더 나은", zh: "好一些" },
      { en: "all day", pron: "올 데이", ko: "하루 종일", zh: "一整天" }
    ],
    sentences: [
      { en: "She was sick yesterday.", pron: "쉬 워즈 식 예스터데이.", ko: "아이가 어제 아팠어요." },
      { en: "We were at home last night.", pron: "위 워 앳 홈 래스트 나잇.", ko: "어젯밤에 우리는 집에 있었어요." },
      { en: "Were you busy last week?", pron: "워 유 비지 래스트 위크?", ko: "지난주에 바쁘셨어요?" }
    ],
    challenge: { en: "She was absent, but she is better now.", pron: "쉬 워즈 앱슨트, 벗 쉬 이즈 베터 나우.", ko: "결석했지만 지금은 나아졌어요." },
    grammar: "지난 상태는 am/is → <b>was</b>, are → <b>were</b>로만 바꾸면 돼요. 뒤에 오는 네 가지 모양은 그대로! I <b>was</b> tired. / She <b>was</b> at school. / We <b>were</b> friends. 질문은 똑같이 앞으로 → <b>Was</b> she okay? / <b>Were</b> you busy? 중국어는 '昨天'만 붙이면 되지만, 영어는 동사도 꼭 바꿔야 해요.",
    dialogue: [
      { who: "A", en: "She was ___ yesterday. Is she okay?", answer: "absent" },
      { who: "B", en: "She ___ sick yesterday.", answer: "was" },
      { who: "A", en: "Oh no. Were you at home ___ day?", answer: "all" },
      { who: "B", en: "Yes, we ___ at home.", answer: "were" },
      { who: "A", en: "How is she today?", answer: "" },
      { who: "B", en: "She is ___ now. Thank you.", answer: "better" }
    ],
    quizLabel: "Day 17 복습 퀴즈",
    quiz: [
      { q: "'한국어 하세요?'를 영어로?", a: "Do you speak Korean?" },
      { q: "'아이가 점심 잘 먹나요?'를 영어로?", a: "Does she eat lunch well?" },
      { q: "'Does she eats'는 어디가 틀렸을까요?", a: "Does 뒤에는 eat (Does she eat ~?)" }
    ]
  },
  {
    day: 19,
    title: "지난 행동 말하기 (-ed / Did you?)",
    situation: "어제 무엇을 했는지 말하고, 상대에게도 물어봐요.",
    words: [
      { en: "finish", pron: "피니시", ko: "끝내다", zh: "完成" },
      { en: "watch", pron: "와치", ko: "보다", zh: "看" },
      { en: "went", pron: "웬트", ko: "갔다 (go의 과거)", zh: "去了" },
      { en: "had", pron: "해드", ko: "먹었다, 가졌다 (have의 과거)", zh: "吃了，有了" },
      { en: "already", pron: "올레디", ko: "이미", zh: "已经" }
    ],
    sentences: [
      { en: "She already finished her homework.", pron: "쉬 올레디 피니시트 허 홈워크.", ko: "아이는 이미 숙제를 끝냈어요." },
      { en: "We went to the park yesterday.", pron: "위 웬트 투 더 파크 예스터데이.", ko: "우리는 어제 공원에 갔어요." },
      { en: "Did you have lunch?", pron: "디 쥬 해브 런치?", ko: "점심 드셨어요?" }
    ],
    challenge: { en: "We watched a movie last night.", pron: "위 와치트 어 무비 래스트 나잇.", ko: "우리는 어젯밤에 영화를 봤어요." },
    grammar: "지난 행동은 동사 끝에 <b>ed</b>를 붙여요 → finish<b>ed</b>, watch<b>ed</b>. 모양이 통째로 바뀌는 동사는 외워요 → go → <b>went</b>, have → <b>had</b>. 질문은 <b>Did</b> + 원래 모양 → <b>Did</b> you <b>have</b> lunch? ⭕ / Did you had ❌ (과거 표시는 Did가 이미 했어요). 대답은 Yes, I did. / No, I didn't.",
    dialogue: [
      { who: "A", en: "Did you ___ lunch?", answer: "have" },
      { who: "B", en: "Yes, I did. We ___ to the park, too.", answer: "went" },
      { who: "A", en: "Nice! Did she ___ her homework?", answer: "finish" },
      { who: "B", en: "Yes, she ___ finished it.", answer: "already" },
      { who: "A", en: "What did you do last night?", answer: "" },
      { who: "B", en: "We ___ a movie.", answer: "watched" }
    ],
    quizLabel: "Day 18 복습 퀴즈",
    quiz: [
      { q: "'아이가 어제 아팠어요'를 영어로?", a: "She was sick yesterday." },
      { q: "'어젯밤에 우리는 집에 있었어요'를 영어로?", a: "We were at home last night." },
      { q: "are의 과거 모양은?", a: "were" }
    ]
  },
  {
    day: 20,
    title: "앞으로의 일 말하기 (will) + Day 11~19 총정리",
    situation: "내일과 다음 주 계획을 선생님이나 친구에게 말해요.",
    words: [
      { en: "tomorrow", pron: "투모로", ko: "내일", zh: "明天" },
      { en: "soon", pron: "순", ko: "곧", zh: "很快" },
      { en: "there", pron: "데어", ko: "거기", zh: "那里" },
      { en: "visit", pron: "비짓", ko: "방문하다", zh: "拜访，看望" },
      { en: "next week", pron: "넥스트 위크", ko: "다음 주", zh: "下周" }
    ],
    sentences: [
      { en: "I will be there soon.", pron: "아이 윌 비 데어 순.", ko: "곧 도착할게요." },
      { en: "I will pick her up tomorrow.", pron: "아이 윌 픽 허 업 투모로.", ko: "내일 제가 아이를 데리러 갈게요." },
      { en: "Will you be at school tomorrow?", pron: "윌 유 비 앳 스쿨 투모로?", ko: "내일 학교에 계실 건가요?" }
    ],
    challenge: { en: "We will visit my parents next week.", pron: "위 윌 비짓 마이 페어런츠 넥스트 위크.", ko: "다음 주에 부모님을 뵈러 갈 거예요." },
    grammar: "앞으로의 일은 <b>will</b>. 상태면 <b>will be</b> + 네 가지 모양(I will be busy / I will be there), 행동이면 <b>will + 동사</b>(I will pick her up). will 뒤는 항상 원래 모양이고, She여도 s를 안 붙여요. 질문은 <b>Will you ~?</b><br><b>한눈에 정리</b> — 상태: am/are/is → was/were → will be · 행동: work → worked → will work · 질문: Are you? / Do you? → Were you? / Did you? → Will you?",
    dialogue: [
      { who: "A", en: "Will you be at school ___?", answer: "tomorrow" },
      { who: "B", en: "Yes. I will ___ her up at three.", answer: "pick" },
      { who: "A", en: "Great. I will ___ there, too.", answer: "be" },
      { who: "B", en: "See you ___!", answer: "soon" },
      { who: "A", en: "Any plans next week?", answer: "" },
      { who: "B", en: "We will ___ my parents next week.", answer: "visit" }
    ],
    quizLabel: "Day 11~19 총복습 퀴즈",
    quiz: [
      { q: "(Day 11 · 상태) '오늘 조금 피곤해요'를 영어로?", a: "I'm a little tired today." },
      { q: "(Day 14 · 하는 중) '지금 저녁 만드는 중이에요'를 영어로?", a: "I'm making dinner right now." },
      { q: "(Day 15 · 행동) '저는 매일 영어를 공부해요'를 영어로?", a: "I study English every day." },
      { q: "(Day 17 · 행동 질문) '아이가 점심 잘 먹나요?'를 영어로?", a: "Does she eat lunch well?" },
      { q: "(Day 19 · 지난 행동) '점심 드셨어요?'를 영어로?", a: "Did you have lunch?" }
    ]
  }
];
