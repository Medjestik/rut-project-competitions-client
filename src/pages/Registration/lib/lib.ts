import type { ISubdivisionOption } from '../types/types';
import { REGULATION_LINK, ORDER_LINK } from '../../../shared/lib/lib';

export const PARTICIPANTS_COUNT = 4;

export const CONFIRM_LINKS = [
	'https://contest.miit.ru/consent',
	'https://rut-miit.ru/org/privacy',
	'https://contest.miit.ru/privacy',
	ORDER_LINK,
	REGULATION_LINK,
];

export const RUT_SUBDIVISIONS: ISubdivisionOption[] = [
	{ id: 'AGA', name: 'АГА' },
	{ id: 'ADH', name: 'АДХ' },
	{ id: 'IZHT', name: 'ИЖТ' },
	{ id: 'PISH', name: 'ПИШ' },
	{ id: 'AVSM', name: 'Академия ВСМ' },
	{ id: 'ISTI', name: 'ИСТИ' },
	{ id: 'VISH', name: 'ВИШ' },
	{ id: 'AVT', name: 'АВТ' },
	{ id: 'ROAT', name: 'РОАТ' },
	{ id: 'IMTK', name: 'ИМТК' },
	{ id: 'IEF', name: 'ИЭФ' },
	{ id: 'YUI', name: 'ЮИ' },
];

export const RUT_UNIVERSITY_ID = 763;
