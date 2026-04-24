export interface IMainStore {
	stages: IStage[];
	stage: IStageData | null;
	stageTemplate: string | null;
	stageVideo: string | null;
	currentStageId: number;
	currentPathPosition: number;
	isOpenUploadLinkPopup: boolean;
	isOpenUploadFilePopup: boolean;
	isOpenUploadVideoPopup: boolean;
	isLoading: boolean;
	isLoadingUpload: boolean;
	isLoadingStageData: boolean;
	isLoadingStages: boolean;
	error: string | null;
}

export interface IStage {
	id: number;
	name: string;
	position: number;
	is_active: boolean;
	start_date?: string;
	end_date?: string;
}

export interface IStageData {
	id: number;
	name: string;
	description: string;
	is_active: boolean;
	position: number;
	team_file_count: number;
	stage_paths: IPath[];
	team_videos: IVideo[];
	url_template: string | null;
	url_video: string | null;
	start_date: string | null;
	end_date: string | null;
}

export interface IPath {
	id: number;
	url_template: string;
	url_video: string;
	path: {
		id: number;
		name: string;
		position: number;
	};
}

export interface IVideo {
	id: number;
	name: string;
	stage: number;
	url: string;
	team: number;
}

export interface IMessageResponse {
	id?: number;
	message: string;
}
