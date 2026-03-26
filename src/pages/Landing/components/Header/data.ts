import { ESECTION } from '../../lib/sections';

export const navLinks = [
	{
		position: 0,
		id: ESECTION.DESCRIPTION,
		text: 'О соревнованиях',
		offset: 0,
		duration: 500,
	},
	{
		position: 1,
		id: ESECTION.STAGES,
		text: 'Этапы',
		offset: 0,
		duration: 1000,
	},
	{
		position: 2,
		id: ESECTION.PROBLEMS,
		text: 'Проблемы',
		offset: 0,
		duration: 1500,
	},
	{ position: 3, id: ESECTION.PRIZE, text: 'Призы', offset: 0, duration: 2000 },
	{
		position: 4,
		id: ESECTION.INVITE,
		text: 'Кого ждем',
		offset: 0,
		duration: 2500,
	},
	{
		position: 5,
		id: ESECTION.FAQ,
		text: 'Ответы на вопросы',
		offset: 0,
		duration: 3000,
	},
	{
		position: 6,
		id: ESECTION.DOCUMENT,
		text: 'Документы',
		offset: 0,
		duration: 3500,
	},
];
