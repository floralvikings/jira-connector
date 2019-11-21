export interface UserInfo {
	self: string;
	key: string;
	accountId: string;
	name: string;
	emailAddress: string;
	avatarUrls: AvatarUrls;
	displayName: string;
	active: boolean;
	timeZone: string;
	groups: ApplicationRoles;
	applicationRoles: ApplicationRoles;
}

export interface ApplicationRoles {
	size: number;
	items: any[];
}

export interface AvatarUrls {
	"48x48": string;
	"24x24": string;
	"16x16": string;
	"32x32": string;
}

export declare class User {
	getUser(
		opts: {
			accountId?: string;
			username?: string;
			userKey?: string;
			expand?: string;
		},
		callback?: (err: any, data: any) => void
	): Promise<UserInfo | any>;

	deleteUser(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	createUser(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	editUser(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	multiProjectSearchAssignable(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	searchAssignable(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	createTemporaryAvatar(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	convertTemporaryAvatar(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	deleteAvatar(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	getAvatars(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	getDefaultColumns(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	setDefaultColumns(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	resetDefaultColumns(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	changePassword(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	searchPermissions(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	searchPicker(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
	search(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

	all(opts: {
		startAt?: number,
		maxResults?: number
	}, callback?: (err: any, data: any) => void): Promise<any>;

	viewIssueSearch(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
}
