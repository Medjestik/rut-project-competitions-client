export interface IAccordionItem {
	id: string;
	title: string;
	content: string;
}

export interface IAccordionItemProps {
	item: IAccordionItem;
}

export interface IAccordion {
	items: IAccordionItem[];
}
