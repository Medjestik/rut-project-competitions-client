export interface IUploadLinkForm {
	title: string;
	link: string;
	isConfirmLink: boolean;
}

export interface IUploadLinkData {
	name: string;
	link: string;
	stage: number;
}

export interface IUploadFileForm {
	title: string;
	file: string;
	fileName: string;
}

export interface IUploadFileData {
	name: string;
	file: string;
	fileName: string;
	stage: number;
}

export interface IUploadVideoForm {
	link: string;
	isConfirmLink: boolean;
}

export interface IUploadVideoData {
	name: string;
	link: string;
	stage: number;
}
