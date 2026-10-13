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
  }
];
