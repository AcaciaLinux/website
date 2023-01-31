export class Package{
	public name: string = ""
	public real_version: number = 0
	public version?: string
	public description?: string
	public hash?: string
	public url?: string
	public dependencies?: Array<string>
}
