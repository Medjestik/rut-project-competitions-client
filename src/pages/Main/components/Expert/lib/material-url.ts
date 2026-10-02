import type { IExpertStage } from '../../../../../store/expert/types';

export const stageMaterialUrl = (stage?: IExpertStage | null): string => {
	if (!stage) {
		return '';
	}

	if (stage.file?.file) {
		const file = stage.file.file;

		if (file.startsWith('http://') || file.startsWith('https://')) {
			return file;
		}

		return `https://contest-api.emiit.ru/${file}`;
	}

	return stage.url?.url || '';
};
