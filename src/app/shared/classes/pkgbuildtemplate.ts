export class TemplateResponse {
	public version: string = "";
	public templates: PkgBuildTemplate[] = [];
}

export class PkgBuildTemplate {
	public name: string = "";
	public url: string = "";
}
