import React from "react";
import Dropzone from "react-dropzone";

import { Files, tryUpload } from '../../../api/files.js';

export default class UploadsForm extends React.Component {
  constructor() {
      super();
  }
  
  componentDidMount() {
  }

  handleDownload(upload){
    
    
    var blob = new Blob([upload.data], {type: upload.type});

    var a = $("<a style='display: none;'/>");
    var url = URL.createObjectURL( blob );
    a.attr("href", url);
    a.attr("download", upload.name);
    $("body").append(a);
    a[0].click();
    window.URL.revokeObjectURL(url);
    a.remove();

  }

  handleUpload(files){
    const { currentUser } = this.props;

    files.forEach((file)=> {

      var reader = new FileReader();
      reader.onload = (fileLoadEvent)=> {

          var data = {
            name: file.name,
            type: file.type,
            size: file.size
          }

          var buffer = new Uint8Array(reader.result)

          Meteor.call('files.upload', data , buffer);

      };
      reader.readAsArrayBuffer(file);
    
    });
    

      // files.forEach((file)=> {
      //  var metaFile = new FS.File(file);
      //       metaFile.userId = currentUser._id;
      //       metaFile.description = '';
      //       metaFile.active = false;

      //     Files.insert(metaFile,  (err, fileObj)=> {
      //         // console.log(fileObj  );
      //     });
      // });
  }

  render() {

    const uploads = tryUpload.find().fetch();

    const li = uploads.map( (upload)=>{

      return <li key={upload._id}>
        <a onClick={this.handleDownload.bind(this, upload)}>{upload.name}</a>
      </li>
    });

    return  <div>
      <Dropzone onDrop={this.handleUpload.bind(this)}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          {li}
    </div>
  }
}