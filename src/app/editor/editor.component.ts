import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeModel } from '@ngstack/code-editor';
import { BranchService } from '../shared/branch/branch.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  theme = 'vs-light';

  constructor(private route: ActivatedRoute, private branch: BranchService) {
    this.route.params.subscribe(args => {
      this.branch
        .request("packagebuild&pkgname=" + args["pkgbuild"])
        .subscribe(res => {
          this.model.value = res.payload;
        })
    });
  }

  model: CodeModel = {
    language: 'shell',
    uri: 'package.bpb',
    value: '',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  onCodeChanged(value: string) {
    console.log('CODE', value);
  }
}
