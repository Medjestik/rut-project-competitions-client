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
	title: string;
	company?: string;
	description?: string;
	icon?: string;
	problem?: string;
	situation?: string;
}
