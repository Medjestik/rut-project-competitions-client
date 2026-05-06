export interface ICatalogStore {
	universities: IUniversity[];
	problems: IProblem[];
	isLoadingCatalog: boolean;
	error: string | null;
}

export interface IUniversity {
	id: number;
	name: string;
	address?: string;
	name_full?: string;
	name_search?: string;
	name_short_csv?: string;
	short_name?: string;
	country?: string;
}

export interface IProblem {
	id: string;
	title?: string;
	title_eng?: string;
	company?: string;
	description?: string;
	icon?: string;
	problem?: string;
	problem_eng?: string;
	situation?: string;
	situation_eng?: string;
}
