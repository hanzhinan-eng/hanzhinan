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
  },
  {
    day: 21,
    title: "아니라고 말하기 ① 상태 (am not / isn't / aren't)",
    situation: "\"아파요?\" \"바빠요?\" 하고 물을 때 '아니에요'라고 대답해요.",
    words: [
      { en: "sure", pron: "슈어", ko: "확실한", zh: "确定" },
      { en: "worried", pron: "워리드", ko: "걱정하는", zh: "担心" },
      { en: "cold", pron: "콜드", ko: "추운, 차가운", zh: "冷" },
      { en: "angry", pron: "앵그리", ko: "화난", zh: "生气" },
      { en: "just", pron: "저스트", ko: "그냥, 단지", zh: "只是" }
    ],
    sentences: [
      { en: "I'm not sure about that.", pron: "아임 낫 슈어 어바웃 댓.", ko: "그건 잘 모르겠어요. (확실하지 않아요)" },
      { en: "She isn't sick today.", pron: "쉬 이즌트 씩 투데이.", ko: "아이는 오늘 안 아파요." },
      { en: "We aren't busy this weekend.", pron: "위 안트 비지 디스 위켄드.", ko: "우리는 이번 주말에 안 바빠요." }
    ],
    challenge: { en: "I'm not angry, I'm just tired.", pron: "아임 낫 앵그리, 아임 저스트 타이어드.", ko: "화난 게 아니라 그냥 피곤해요." },
    grammar: "'아니에요'도 먼저 골라요: <b>상태</b>인가, <b>행동</b>인가? 상태면 am / are / is <b>바로 뒤에 not</b>만 넣어요. is not = <b>isn't</b>(이즌트), are not = <b>aren't</b>(안트). am not은 줄인 모양이 없어서 <b>I'm not</b>이라고 해요. 중국어 '我不累'처럼 not 하나만 넣으면 끝! 단, 상태에는 don't를 쓰지 않아요 → I don't tired ❌ / I<b>'m not</b> tired ⭕",
    dialogue: [
      { who: "A", en: "Is she sick today?", answer: "" },
      { who: "B", en: "No, she ___ sick. She's okay.", answer: "isn't" },
      { who: "A", en: "Are you ___ this weekend?", answer: "busy" },
      { who: "B", en: "No, we ___ busy.", answer: "aren't" },
      { who: "A", en: "It's cold outside. I'm a little ___.", answer: "worried" },
      { who: "B", en: "Is it very cold? I'm not ___.", answer: "sure" }
    ],
    quizLabel: "Day 20 복습 퀴즈",
    quiz: [
      { q: "'곧 도착할게요'를 영어로?", a: "I will be there soon." },
      { q: "'내일 제가 아이를 데리러 갈게요'를 영어로?", a: "I will pick her up tomorrow." },
      { q: "She will 뒤의 동사에 s를 붙일까요?", a: "안 붙여요 (She will go.)" }
    ]
  },
  {
    day: 22,
    title: "아니라고 말하기 ② 행동 (don't / doesn't)",
    situation: "안 하는 일, 안 먹는 음식을 선생님이나 친구에게 말해요.",
    words: [
      { en: "know", pron: "노", ko: "알다", zh: "知道" },
      { en: "understand", pron: "언더스탠드", ko: "이해하다", zh: "明白" },
      { en: "meat", pron: "밋", ko: "고기", zh: "肉" },
      { en: "milk", pron: "밀크", ko: "우유", zh: "牛奶" },
      { en: "word", pron: "워드", ko: "단어", zh: "单词" }
    ],
    sentences: [
      { en: "I don't know her name.", pron: "아이 돈트 노 허 네임.", ko: "저는 그분 이름을 몰라요." },
      { en: "She doesn't drink milk.", pron: "쉬 더즌트 드링크 밀크.", ko: "아이는 우유를 안 마셔요." },
      { en: "We don't work on weekends.", pron: "위 돈트 워크 온 위켄즈.", ko: "우리는 주말에 일하지 않아요." }
    ],
    challenge: { en: "Sorry, I don't understand that word.", pron: "쏘리, 아이 돈트 언더스탠드 댓 워드.", ko: "죄송해요, 그 단어를 모르겠어요." },
    grammar: "행동이 아니라고 할 때는 동사 <b>앞에 don't</b>(돈트)를 넣어요. He / She면 <b>doesn't</b>(더즌트). doesn't 뒤의 동사는 <b>원래 모양</b>이에요 → She doesn't <b>drink</b> ⭕ / She doesn't drinks ❌ (s는 does가 이미 가져갔어요. Day 17과 같은 규칙!) 중국어는 상태도 행동도 '不' 하나지만, 영어는 나눠요 → 상태: I<b>'m not</b> tired. / 행동: I <b>don't</b> know.",
    dialogue: [
      { who: "A", en: "Does she drink milk?", answer: "" },
      { who: "B", en: "No, she ___ drink milk.", answer: "doesn't" },
      { who: "A", en: "Okay. Does she eat ___?", answer: "meat" },
      { who: "B", en: "Yes, but she doesn't ___ spicy food.", answer: "eat" },
      { who: "A", en: "Do you ___ the new teacher?", answer: "know" },
      { who: "B", en: "No, I ___ know her name.", answer: "don't" }
    ],
    quizLabel: "Day 21 복습 퀴즈",
    quiz: [
      { q: "'그건 잘 모르겠어요(확실하지 않아요)'를 영어로?", a: "I'm not sure about that." },
      { q: "'아이는 오늘 안 아파요'를 영어로?", a: "She isn't sick today." },
      { q: "'I am not'을 줄이면?", a: "I'm not (amn't 라는 말은 없어요)" }
    ]
  },
  {
    day: 23,
    title: "지난 일 아니라고 말하기 (wasn't / didn't)",
    situation: "어제 못 한 일, 없었던 일을 말하고 사과해요.",
    words: [
      { en: "sleep", pron: "슬립", ko: "자다", zh: "睡觉" },
      { en: "call", pron: "콜", ko: "전화하다", zh: "打电话" },
      { en: "see", pron: "씨", ko: "보다 (눈에 들어오다)", zh: "看见" },
      { en: "message", pron: "메시지", ko: "메시지", zh: "消息" },
      { en: "sorry", pron: "쏘리", ko: "미안한", zh: "对不起" }
    ],
    sentences: [
      { en: "I wasn't at home yesterday.", pron: "아이 워즌트 앳 홈 예스터데이.", ko: "어제 집에 없었어요." },
      { en: "She didn't sleep well last night.", pron: "쉬 디든트 슬립 웰 래스트 나잇.", ko: "아이가 어젯밤에 잘 못 잤어요." },
      { en: "I didn't see your message.", pron: "아이 디든트 씨 유어 메시지.", ko: "메시지를 못 봤어요." }
    ],
    challenge: { en: "Sorry, I didn't call you yesterday.", pron: "쏘리, 아이 디든트 콜 유 예스터데이.", ko: "미안해요, 어제 전화를 못 했어요." },
    grammar: "지난 일도 똑같이 골라요. 지난 <b>상태</b>가 아니면 <b>wasn't</b>(워즌트) / <b>weren't</b>(원트). 지난 <b>행동</b>이 아니면 <b>didn't</b>(디든트) + 원래 모양 → I didn't <b>see</b> ⭕ / I didn't saw ❌ (과거 표시는 did가 이미 했어요. Day 19의 Did you ~? 와 같아요.) didn't는 I든 She든 <b>모두 똑같이</b> 써서 편해요.",
    dialogue: [
      { who: "A", en: "I ___ you yesterday.", answer: "called" },
      { who: "B", en: "Sorry, I ___ at home.", answer: "wasn't" },
      { who: "A", en: "Did you see my ___?", answer: "message" },
      { who: "B", en: "No, I didn't ___ it. Sorry.", answer: "see" },
      { who: "A", en: "It's okay. You look tired.", answer: "" },
      { who: "B", en: "Yes. She didn't ___ well last night.", answer: "sleep" }
    ],
    quizLabel: "Day 22 복습 퀴즈",
    quiz: [
      { q: "'저는 그분 이름을 몰라요'를 영어로?", a: "I don't know her name." },
      { q: "'아이는 우유를 안 마셔요'를 영어로?", a: "She doesn't drink milk." },
      { q: "She doesn't 뒤에는 eat일까요, eats일까요?", a: "eat (She doesn't eat meat.)" }
    ]
  },
  {
    day: 24,
    title: "할 수 있어요 (can / can't)",
    situation: "내가 할 수 있는 것과 못 하는 것을 소개해요.",
    words: [
      { en: "can", pron: "캔", ko: "~할 수 있다", zh: "会，能" },
      { en: "swim", pron: "스윔", ko: "수영하다", zh: "游泳" },
      { en: "drive", pron: "드라이브", ko: "운전하다", zh: "开车" },
      { en: "ride", pron: "라이드", ko: "타다", zh: "骑" },
      { en: "bike", pron: "바이크", ko: "자전거", zh: "自行车" }
    ],
    sentences: [
      { en: "I can speak Chinese and Korean.", pron: "아이 캔 스픽 차이니즈 앤 코리언.", ko: "저는 중국어와 한국어를 할 수 있어요." },
      { en: "She can ride a bike now.", pron: "쉬 캔 라이드 어 바이크 나우.", ko: "아이는 이제 자전거를 탈 수 있어요." },
      { en: "We can't go out today.", pron: "위 캔트 고 아웃 투데이.", ko: "우리는 오늘 못 나가요." }
    ],
    challenge: { en: "I can drive, but I can't swim.", pron: "아이 캔 드라이브, 벗 아이 캔트 스윔.", ko: "운전은 할 수 있지만 수영은 못 해요." },
    grammar: "<b>can</b>은 행동 앞에 붙이는 '도우미'예요. Day 20의 will과 규칙이 똑같아요: 뒤에는 항상 <b>원래 모양</b>, She여도 s를 안 붙여요 → She can <b>ride</b> ⭕ / She can rides ❌. 못 하면 <b>can't</b>(캔트). 중국어 '会'(배워서 할 줄 안다)와 '能'(할 수 있다)을 영어는 <b>둘 다 can</b>으로 말해요. 듣기 팁: can은 짧고 약하게, can't는 길고 세게 들려요.",
    dialogue: [
      { who: "A", en: "Can you speak Korean?", answer: "" },
      { who: "B", en: "Yes, I ___ speak Chinese and Korean.", answer: "can" },
      { who: "A", en: "Wow! Can your daughter ___ a bike?", answer: "ride" },
      { who: "B", en: "Yes, she can. But she ___ swim.", answer: "can't" },
      { who: "A", en: "Can you ___?", answer: "drive" },
      { who: "B", en: "Yes, I can. But we can't ___ out today.", answer: "go" }
    ],
    quizLabel: "Day 23 복습 퀴즈",
    quiz: [
      { q: "'어제 집에 없었어요'를 영어로?", a: "I wasn't at home yesterday." },
      { q: "'메시지를 못 봤어요'를 영어로?", a: "I didn't see your message." },
      { q: "I didn't 뒤에는 see일까요, saw일까요?", a: "see (I didn't see it.)" }
    ]
  },
  {
    day: 25,
    title: "부탁하기 (Can you ~? / Can I ~?)",
    situation: "선생님 말이 빨라서 못 알아들었을 때 다시 말해 달라고 부탁해요.",
    words: [
      { en: "say", pron: "쎄이", ko: "말하다", zh: "说" },
      { en: "again", pron: "어겐", ko: "다시", zh: "再" },
      { en: "ask", pron: "애스크", ko: "묻다", zh: "问" },
      { en: "question", pron: "퀘스천", ko: "질문", zh: "问题" },
      { en: "slowly", pron: "슬로울리", ko: "천천히", zh: "慢慢地" }
    ],
    sentences: [
      { en: "Can you say that again?", pron: "캔 유 쎄이 댓 어겐?", ko: "다시 말해 주실 수 있나요?" },
      { en: "Can I ask a question?", pron: "캔 아이 애스크 어 퀘스천?", ko: "질문해도 될까요?" },
      { en: "Can you speak slowly, please?", pron: "캔 유 스픽 슬로울리, 플리즈?", ko: "천천히 말해 주시겠어요?" }
    ],
    challenge: { en: "Could you say that again, please?", pron: "쿠 쥬 쎄이 댓 어겐, 플리즈?", ko: "다시 한 번 말씀해 주시겠어요? (더 공손하게)" },
    grammar: "질문은 can을 <b>맨 앞으로</b> 보내요 (Will you ~? 와 같은 방법). <b>Can you ~?</b> = 해 줄 수 있어요? (부탁) / <b>Can I ~?</b> = 제가 해도 돼요? (허락). 끝에 <b>please</b>를 붙이면 부드러워져요. 더 공손하게는 <b>Could you ~?</b>(쿠 쥬). 대답은 <b>Sure.</b>(그럼요) / <b>Sorry, I can't.</b>(미안해요, 안 돼요). 못 알아들었을 때 웃고 넘기지 말고 이 문장을 쓰는 것이 실력이 느는 지름길이에요.",
    dialogue: [
      { who: "A", en: "She was very good in class today.", answer: "" },
      { who: "B", en: "Sorry, can you ___ that again?", answer: "say" },
      { who: "A", en: "Sure. She was very good today.", answer: "" },
      { who: "B", en: "Thank you. Can you speak ___, please?", answer: "slowly" },
      { who: "A", en: "Of course. Do you have a ___?", answer: "question" },
      { who: "B", en: "Yes. Can I ___ about her homework?", answer: "ask" }
    ],
    quizLabel: "Day 24 복습 퀴즈",
    quiz: [
      { q: "'저는 중국어와 한국어를 할 수 있어요'를 영어로?", a: "I can speak Chinese and Korean." },
      { q: "'우리는 오늘 못 나가요'를 영어로?", a: "We can't go out today." },
      { q: "She can 뒤에는 swim일까요, swims일까요?", a: "swim (She can swim.)" }
    ]
  },
  {
    day: 26,
    title: "해야 해요 (have to / don't have to)",
    situation: "아이를 데리러 가야 해서 먼저 일어나야 할 때 말해요.",
    words: [
      { en: "have to", pron: "해프 투", ko: "~해야 하다", zh: "得，必须" },
      { en: "leave", pron: "리브", ko: "떠나다, 나가다", zh: "离开" },
      { en: "hurry", pron: "허리", ko: "서두르다", zh: "赶快" },
      { en: "wake up", pron: "웨이크 업", ko: "(잠에서) 일어나다", zh: "起床" },
      { en: "pay", pron: "페이", ko: "돈을 내다", zh: "付钱" }
    ],
    sentences: [
      { en: "I have to leave now.", pron: "아이 해프 투 리브 나우.", ko: "지금 가야 해요." },
      { en: "She has to wake up early.", pron: "쉬 해스 투 웨이크 업 얼리.", ko: "아이는 일찍 일어나야 해요." },
      { en: "You don't have to pay.", pron: "유 돈트 해프 투 페이.", ko: "돈 안 내셔도 돼요." }
    ],
    challenge: { en: "We have to hurry, we're late.", pron: "위 해프 투 허리, 위어 레이트.", ko: "서둘러야 해요, 우리 늦었어요." },
    grammar: "꼭 해야 하는 일은 <b>have to + 원래 모양</b>. She / He면 <b>has to</b>(해스 투). 빨리 말하면 '해프터'처럼 들려요. <b>조심!</b> <b>don't have to</b>는 '하면 안 돼요(不可以)'가 아니라 <b>'안 해도 돼요(不用)'</b>예요 → You don't have to pay. = 不用付钱。 지난 일은 <b>had to</b> → I had to leave early. (일찍 가야 했어요.)",
    dialogue: [
      { who: "A", en: "Can you have coffee with me?", answer: "" },
      { who: "B", en: "Sorry, I ___ to leave now.", answer: "have" },
      { who: "A", en: "Oh, do you have to ___?", answer: "hurry" },
      { who: "B", en: "Yes. I have to ___ up my daughter.", answer: "pick" },
      { who: "A", en: "Okay. Do we have to ___ here?", answer: "pay" },
      { who: "B", en: "No, you ___ have to pay. It's free.", answer: "don't" }
    ],
    quizLabel: "Day 25 복습 퀴즈",
    quiz: [
      { q: "'다시 말해 주실 수 있나요?'를 영어로?", a: "Can you say that again?" },
      { q: "'질문해도 될까요?'를 영어로?", a: "Can I ask a question?" },
      { q: "Can you ~? 를 더 공손하게 바꾸면?", a: "Could you ~?" }
    ]
  },
  {
    day: 27,
    title: "하고 싶어요 (want to)",
    situation: "먹고 싶은 것, 배우고 싶은 것, 하기 싫은 것을 말해요.",
    words: [
      { en: "want", pron: "원트", ko: "원하다", zh: "想要" },
      { en: "learn", pron: "런", ko: "배우다", zh: "学" },
      { en: "buy", pron: "바이", ko: "사다", zh: "买" },
      { en: "try", pron: "트라이", ko: "해 보다, 먹어 보다", zh: "试" },
      { en: "something", pron: "썸띵", ko: "무언가", zh: "什么东西" }
    ],
    sentences: [
      { en: "I want to learn English.", pron: "아이 원 투 런 잉글리시.", ko: "영어를 배우고 싶어요." },
      { en: "She wants to buy a book.", pron: "쉬 원츠 투 바이 어 북.", ko: "아이가 책을 사고 싶어 해요." },
      { en: "I don't want to go out.", pron: "아이 돈트 원 투 고 아웃.", ko: "나가고 싶지 않아요." }
    ],
    challenge: { en: "I want to eat something spicy.", pron: "아이 원 투 잇 썸띵 스파이시.", ko: "뭔가 매운 걸 먹고 싶어요." },
    grammar: "<b>want to + 원래 모양</b> = ~하고 싶다 (중국어 '想'). 빨리 말하면 '워너'처럼 들려요. want는 <b>행동</b> 동사라서 지금까지 배운 규칙이 그대로예요 → She면 <b>wants</b> to, 아니면 <b>don't</b> want to, 질문은 <b>Do you</b> want to ~? 물건을 원할 때는 to 없이 → I want water. / 행동을 원할 때는 to를 넣어요 → I want <b>to</b> drink water.",
    dialogue: [
      { who: "A", en: "What do you want to eat?", answer: "" },
      { who: "B", en: "I want to eat ___ spicy.", answer: "something" },
      { who: "A", en: "Okay! Do you want to ___ this?", answer: "try" },
      { who: "B", en: "Yes! And she ___ to buy a book later.", answer: "wants" },
      { who: "A", en: "Do you ___ to go out now?", answer: "want" },
      { who: "B", en: "No, I ___ want to go out. I'm tired.", answer: "don't" }
    ],
    quizLabel: "Day 26 복습 퀴즈",
    quiz: [
      { q: "'지금 가야 해요'를 영어로?", a: "I have to leave now." },
      { q: "'돈 안 내셔도 돼요'를 영어로?", a: "You don't have to pay." },
      { q: "She 뒤에는 have to일까요, has to일까요?", a: "has to (She has to wake up early.)" }
    ]
  },
  {
    day: 28,
    title: "미리 정한 계획 말하기 (be going to)",
    situation: "주말 계획, 다음 달 계획을 친구에게 말해요.",
    words: [
      { en: "plan", pron: "플랜", ko: "계획", zh: "计划" },
      { en: "travel", pron: "트래블", ko: "여행하다", zh: "旅行" },
      { en: "stay", pron: "스테이", ko: "머물다", zh: "待" },
      { en: "birthday", pron: "버스데이", ko: "생일", zh: "生日" },
      { en: "party", pron: "파티", ko: "파티", zh: "派对" }
    ],
    sentences: [
      { en: "I'm going to stay home today.", pron: "아임 고잉 투 스테이 홈 투데이.", ko: "오늘은 집에 있을 거예요." },
      { en: "We're going to travel next month.", pron: "위어 고잉 투 트래블 넥스트 먼스.", ko: "우리는 다음 달에 여행 갈 거예요." },
      { en: "Are you going to come?", pron: "아 유 고잉 투 컴?", ko: "오실 거예요?" }
    ],
    challenge: { en: "We're going to have a birthday party.", pron: "위어 고잉 투 해브 어 버스데이 파티.", ko: "우리는 생일 파티를 할 거예요." },
    grammar: "미리 마음먹은 계획은 <b>am / are / is + going to + 원래 모양</b>. <b>상태</b> 틀(am/are/is) 안에 행동을 넣은 모양이라서 Day 14의 ing와 한 가족이에요. 그래서 아니면 <b>I'm not</b> going to, 질문은 <b>Are you</b> going to ~? (상태 규칙 그대로!) 빨리 말하면 '거너'처럼 들려요. <b>will</b>은 지금 막 정한 일·약속(I will be there soon), <b>going to</b>는 미리 정해 둔 계획. 지금 단계에서는 둘 중 아무거나 써도 다 통해요.",
    dialogue: [
      { who: "A", en: "Do you have any ___ this weekend?", answer: "plans" },
      { who: "B", en: "Yes. We're going to have a birthday ___.", answer: "party" },
      { who: "A", en: "Nice! Are you ___ to cook?", answer: "going" },
      { who: "B", en: "No, I'm ___ going to cook.", answer: "not" },
      { who: "A", en: "And next month?", answer: "" },
      { who: "B", en: "We're going to ___ to China.", answer: "travel" }
    ],
    quizLabel: "Day 27 복습 퀴즈",
    quiz: [
      { q: "'영어를 배우고 싶어요'를 영어로?", a: "I want to learn English." },
      { q: "'나가고 싶지 않아요'를 영어로?", a: "I don't want to go out." },
      { q: "want 뒤에 행동(동사)이 오면 사이에 무엇을 넣을까요?", a: "to (I want to eat.)" }
    ]
  },
  {
    day: 29,
    title: "궁금한 것 묻기 (What / When / Why / How)",
    situation: "수업 시간, 주말에 한 일 등 궁금한 것을 자세히 물어봐요.",
    words: [
      { en: "what", pron: "왓", ko: "무엇", zh: "什么" },
      { en: "when", pron: "웬", ko: "언제", zh: "什么时候" },
      { en: "why", pron: "와이", ko: "왜", zh: "为什么" },
      { en: "how", pron: "하우", ko: "어떻게, 어땠는지", zh: "怎么，怎么样" },
      { en: "start", pron: "스타트", ko: "시작하다", zh: "开始" }
    ],
    sentences: [
      { en: "When does the class start?", pron: "웬 더즈 더 클래스 스타트?", ko: "수업은 언제 시작해요?" },
      { en: "What did you do yesterday?", pron: "왓 디 쥬 두 예스터데이?", ko: "어제 뭐 하셨어요?" },
      { en: "How was your weekend?", pron: "하우 워즈 유어 위켄드?", ko: "주말 어떠셨어요?" }
    ],
    challenge: { en: "Why are you learning English?", pron: "와이 아 유 러닝 잉글리시?", ko: "왜 영어를 배우고 있어요?" },
    grammar: "궁금한 말(<b>What / When / Where / Why / How</b>)을 <b>맨 앞</b>에 놓고, 그 뒤는 지금까지 배운 질문을 그대로 붙여요. 상태 질문 → <b>How</b> + was your weekend? / 행동 질문 → <b>When</b> + does the class start? 중국어는 '你昨天做了<b>什么</b>?'처럼 궁금한 말이 제자리에 있지만, 영어는 <b>무조건 맨 앞</b>으로 나와요 → <b>What</b> did you do yesterday?",
    dialogue: [
      { who: "A", en: "___ was your weekend?", answer: "How" },
      { who: "B", en: "It was good. We went to the park.", answer: "" },
      { who: "A", en: "Nice. ___ did you do there?", answer: "What" },
      { who: "B", en: "We had lunch there.", answer: "" },
      { who: "A", en: "___ does the class start tomorrow?", answer: "When" },
      { who: "B", en: "It ___ at nine.", answer: "starts" }
    ],
    quizLabel: "Day 28 복습 퀴즈",
    quiz: [
      { q: "'오늘은 집에 있을 거예요'를 영어로?", a: "I'm going to stay home today." },
      { q: "'오실 거예요?'를 영어로?", a: "Are you going to come?" },
      { q: "going to 뒤의 동사는 어떤 모양일까요?", a: "원래 모양 (She is going to travel.)" }
    ]
  },
  {
    day: 30,
    title: "이유 말하기 (because / so) + Day 21~29 총정리",
    situation: "\"왜요?\" 하고 물을 때 이유를 붙여서 길게 대답해요. (말하기 시험 맛보기)",
    words: [
      { en: "because", pron: "비코즈", ko: "왜냐하면, ~라서", zh: "因为" },
      { en: "so", pron: "쏘", ko: "그래서", zh: "所以" },
      { en: "together", pron: "투게더", ko: "함께", zh: "一起" },
      { en: "important", pron: "임포턴트", ko: "중요한", zh: "重要" },
      { en: "reason", pron: "리즌", ko: "이유", zh: "理由" }
    ],
    sentences: [
      { en: "I'm happy because we're together.", pron: "아임 해피 비코즈 위어 투게더.", ko: "우리가 함께 있어서 행복해요." },
      { en: "I can't go because I'm busy.", pron: "아이 캔트 고 비코즈 아임 비지.", ko: "바빠서 못 가요." },
      { en: "She was sick, so she was absent.", pron: "쉬 워즈 씩, 쏘 쉬 워즈 앱선트.", ko: "아이가 아파서 결석했어요." }
    ],
    challenge: { en: "I'm learning English because I want to travel.", pron: "아임 러닝 잉글리시 비코즈 아이 원 투 트래블.", ko: "여행하고 싶어서 영어를 배우고 있어요." },
    grammar: "이유는 <b>because + 문장</b>, 결과는 <b>so + 문장</b>. 뒤에 오는 문장은 상태든 행동이든 배운 그대로 붙여요. <b>조심!</b> 중국어는 '因为…所以…'를 짝으로 쓰지만, 영어는 <b>둘 중 하나만</b> 써요 → Because she was sick, so she was absent ❌ / She was sick, <b>so</b> she was absent ⭕<br><b>한눈에 정리 (Day 21~29)</b> — 아니에요: 상태 am not / isn't / aren't → wasn't / weren't · 행동 don't / doesn't → didn't · 도우미(뒤는 항상 원래 모양): can · have to · want to · be going to · 궁금한 말(What / When / Why / How)은 맨 앞",
    dialogue: [
      { who: "A", en: "Why are you learning English?", answer: "" },
      { who: "B", en: "___ I want to travel.", answer: "Because" },
      { who: "A", en: "Good ___! Can you come to the party tomorrow?", answer: "reason" },
      { who: "B", en: "Sorry, I can't go ___ I have to work.", answer: "because" },
      { who: "A", en: "That's okay. Family is ___.", answer: "important" },
      { who: "B", en: "Yes. She was sick, ___ we have to stay home.", answer: "so" }
    ],
    quizLabel: "Day 21~29 총복습 퀴즈",
    quiz: [
      { q: "(Day 21 · 상태 아니에요) '그건 잘 모르겠어요'를 영어로?", a: "I'm not sure about that." },
      { q: "(Day 22 · 행동 아니에요) '아이는 우유를 안 마셔요'를 영어로?", a: "She doesn't drink milk." },
      { q: "(Day 23 · 지난 일) '메시지를 못 봤어요'를 영어로?", a: "I didn't see your message." },
      { q: "(Day 25 · 부탁) '다시 말해 주실 수 있나요?'를 영어로?", a: "Can you say that again?" },
      { q: "(Day 26 · 해야 해요) '지금 가야 해요'를 영어로?", a: "I have to leave now." },
      { q: "(Day 29 · 궁금한 말) '수업은 언제 시작해요?'를 영어로?", a: "When does the class start?" }
    ]
  }
];
