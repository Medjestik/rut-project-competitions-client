type TLang = 'ru' | 'en';

type TStageLinks = string | Record<number, string>;

export const tempLinks: Record<TLang, Record<number, TStageLinks>> = {
	ru: {
		1: {
			1: 'https://disk.yandex.ru/i/6d7TxMi4-TXu9A',
			2: 'https://disk.yandex.ru/i/gfrAGzLJGzClCQ',
			3: 'https://disk.yandex.ru/i/RT6x9Ky2UNtCtg',
		},
		2: {
			1: 'https://disk.yandex.ru/i/ihCmYx86Gqq9OA',
			2: 'https://disk.yandex.ru/i/AuHy_23B7DrO4g',
			3: 'https://disk.yandex.ru/i/Ku5kJd_Sen227w',
		},
		3: {
			1: 'https://disk.yandex.ru/i/C0AdYXcr9T_E1w',
			2: 'https://disk.yandex.ru/i/Nmdi2z2dkmSbWg',
			3: 'https://disk.yandex.ru/i/ZUQKrzt7U9_TsQ',
		},
		4: {
			1: 'https://disk.yandex.ru/i/VP2C_WUPEggNHg',
			2: 'https://disk.yandex.ru/i/UaO7P3Rd0-W_CQ',
			3: 'https://disk.yandex.ru/i/27ekaoNFy8_j4A',
		},
		5: 'https://disk.yandex.ru/i/tEb8Y4NEQLSqlA',
	},
	en: {
		1: {
			1: 'https://disk.yandex.ru/i/QU-4QwUVAS7I7w',
			2: 'https://disk.yandex.ru/i/NBAGb6Kcr_f26g',
			3: 'https://disk.yandex.ru/i/yDD4HT9k2MWbTg',
		},
		2: {
			1: 'https://disk.yandex.ru/i/uQ-ZxBfQJ128aQ',
			2: 'https://disk.yandex.ru/i/4PJpWf5IGhnMeQ',
			3: 'https://disk.yandex.ru/i/nkzaOam8bMeWng',
		},
		3: {
			1: 'https://disk.yandex.ru/i/-KDpEu82BD4MXw',
			2: 'https://disk.yandex.ru/i/QDycxBGr27dbKA',
			3: 'https://disk.yandex.ru/i/skJIw2P2yGuOlQ',
		},
		4: {
			1: 'https://disk.yandex.ru/i/-L7cGbzwM2NP1g',
			2: 'https://disk.yandex.ru/i/m9vbNU1jDqfIZg',
			3: 'https://disk.yandex.ru/i/s5aOMbkvvcnBqg',
		},
		5: 'https://disk.yandex.ru/i/-n0H-6WF50mgCA',
	},
};

export const getTemplateLink = (
	lang: string,
	stageId: number,
	pathPosition?: number
): string => {
	const normalizedLang = lang.startsWith('ru') ? 'ru' : 'en';

	const stage = tempLinks[normalizedLang]?.[stageId];

	if (!stage) return '';

	// если это строка (stage 5)
	if (typeof stage === 'string') {
		return stage;
	}

	// если это объект (stage 1–4)
	return stage[pathPosition ?? 1] ?? '';
};
