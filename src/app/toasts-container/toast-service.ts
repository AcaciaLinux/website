import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: any[] = [];

	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}

	s_i(text: string | TemplateRef<any>) {
		this.show(text);
	}

	s_ok(text: string | TemplateRef<any>) {
		this.show(text, { classname: 'bg-success text-light' });
	}

	s_err(text: string | TemplateRef<any>) {
		this.show(text, { classname: 'bg-danger text-light', delay: 5000 });
	}

	remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
