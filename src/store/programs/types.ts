export interface IProgramsStore {
	programs: IProgram[];
	streams: IStream[];
	currentProgram: { name: string; id: number } | null;
	currentBatch: IBatch | null;
	isLoadingPrograms: boolean;
	isLoadingAction: boolean;
	error: string | null;
}

export interface IProgram {
	id: number;
	name: string;
	about_description: string;
	cost: string;
	curriculum: string;
	direction: number;
	direction_name: string;
	duration: string;
	enrollment_process: string;
	hours_volume: number;
	lead: string;
	learning_format: string;
	program_type: 'pk' | 'pp';
	outcome: string;
	requirements: string;
	status: string;
	target_audience: string;
	training_direction_code: string;
}

export interface IStream {
	direction_name: string;
	hours_volume: number;
	id: number;
	name: string;
	batches: IBatch[];
}

export interface IBatch {
	action_button_text: string;
	cost: string;
	end_date: string;
	enrollment_status_text: string;
	id: number;
	is_action_enabled: boolean;
	learning_format: string;
	start_date: string;
	status: string;
}
