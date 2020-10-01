import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './wysiwyg.css';

export const UploadedItem = ({id, filename, file, onClick}) => {
  const [filetype, setFiletype] = React.useState("");
  const [imgsrc, setImgsrc] = React.useState();

  React.useEffect(()=> {
    if (file.type === 'image/jpeg' || file.type === 'image/png' ) {
      setImgsrc(URL.createObjectURL(file))
      setFiletype("image")
    } else if (file.type === 'application/pdf') {
      setFiletype("pdf")
    } else {
      setFiletype("video")
    }
  }, [file])
  
  return (
    <ContentWrapper>
    {
      filetype && filetype === "image" && (
        <UploadedItemWrapper>
        <PreviewImage src={imgsrc} />
        <DeleteIconWrapper><DeleteForeverIcon onClick={onClick} color="secondary"/></DeleteIconWrapper>
        </UploadedItemWrapper>
        )
    }
    {
      filetype && filetype === "pdf" && (
        <PdfItemWrapper>
        <PictureAsPdfOutlinedIcon />
        <Description>{file.name}</Description>
        <DeleteIconWrapper><DeleteForeverIcon onClick={onClick} color="secondary"/></DeleteIconWrapper>
        </PdfItemWrapper>
        )
    }
    {
      filetype && filetype === "video" && (
        <PdfItemWrapper>
        <VideoLibraryOutlinedIcon />
        <Description>{file.name}</Description>
        <DeleteIconWrapper><DeleteForeverIcon onClick={onClick} color="secondary"/></DeleteIconWrapper>
        </PdfItemWrapper>
        )
    }
    </ContentWrapper>
    
    )
}
export const TestTitle = styled.h1`
  color: red;
`
const Wysiwyg = () => {

const [files, setFiles] = React.useState();
const [bgcolor, setBgcolor] = React.useState("lightgray");
const [dropStatus, setDropStatus] = React.useState(false);
const [editorState, setEditorState] = React.useState(<p style="color:red">My initial content.</p>)
const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();

    setBgcolor("red");
  }
  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();

      setBgcolor("lightgray");
  }
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();

    setBgcolor("lightgray");
  }
  const validateTypes = file => {
    // check the type
    console.log('file', file)
    var validTypes = [
      'image/jpeg', 
      'image/png', 
      'image/gif', 
      'video/mp4', 
      'video/x-flv', 
      'video/mpeg', 
      'video/ogg', 
      'video/x-msvideo', 
      'video/x-ms-wmv', 
      'video/quicktime', 
      'video/3gpp', 
      'video/MP2T', 
      'application/pdf'];
        if (validTypes.indexOf( file.type ) === -1) {
            alert("Invalid File Type");
            return false;
        }
        return true;
  }
  // let filesSet = new Set();
  var filesArr = []

  const handleDrop = (event, files) => {
    setTimeout(()=>{
      console.log("kkk", files)
    }, 1500)
    event.preventDefault();
      event.stopPropagation();
      setDropStatus(true);
      setBgcolor("lightgray");
      const dt = event.dataTransfer,
          cfiles = dt.files; 
      let tempArr = []    
    if (cfiles.length) {
      if (files) {
        for (var i = 0, len = cfiles.length; i < len; i++) {
            if (validateTypes(cfiles[i])){
              // filesArr = [...filesArr, cfiles[i]]
                tempArr = [...tempArr, cfiles[i]]
            }
        }
        filesArr = [...files, ...tempArr]
      } else {
        for (var j = 0, jlen = cfiles.length; j < jlen; j++) {
            if (validateTypes(cfiles[j])){
              // filesArr = [...filesArr, cfiles[i]]
                filesArr = [...filesArr, cfiles[j]]
            }
        }
      }

      setFiles(filesArr);
      setEditorState("hahah")

      
    }     
  }
  const deleteItem = async file => {
    filesArr = filesArr.filter(el => el.name !== file.name)
    const filterArr = files.filter(el => el.name !== file.name);
    await setFiles(filterArr);
  }
  var TextAreaEL = document.getElementsByClassName("rdw-editor-main");
  React.useEffect(()=>{
    if (TextAreaEL) {
      TextAreaEL[0].addEventListener('dragenter', handleDragEnter );
      TextAreaEL[0].addEventListener('dragleave', handleDragLeave );
      TextAreaEL[0].addEventListener('dragover', handleDragOver );
      TextAreaEL[0].addEventListener('drop', function(event) {
        handleDrop(event,files)
      } );

    }
  }, [files])
  React.useEffect(()=>{
    return ()=>{
      TextAreaEL[0].removeEventListener('dragenter', handleDragEnter)
      TextAreaEL[0].removeEventListener('dragleave', handleDragLeave)
      TextAreaEL[0].removeEventListener('dragover', handleDragOver)
      TextAreaEL[0].removeEventListener('drop', handleDrop)
    }
  },[])

  
    const editorStyle = {
	    border: `1px solid ${bgcolor}`,
	    padding: '3px',
	    borderRadius: '2px',
	    width: '100%',
      height: '200px',
      overflow: 'hidden',
	};

    return (
      <>
    	<Editor
  		    editorStyle={editorStyle}
          toolbar={{
            
            remove: { className: "hidden" },
          }}
  		    placeholder="Please type a content or drag and drop files..."
  		/>
      { 
        dropStatus && (
                <TextArea>
                {
                  files && files.length > 0 && files.map((file, index)=>{
                    return (
                      <UploadedItem key={index} file={file} onClick={()=>deleteItem(file)}></UploadedItem>
                    )
                  }) 
                }
                </TextArea>
                )
      }
      </>

    	)
}

const TextArea = styled.div`
  width: 100%;
  margin: 0 auto;
  border-radius: 1px;
  margin-bottom: 1rem;
  transition: all .3s;
  display: flex;
  flex-wrap: wrap;
`
const UploadedItemWrapper = styled.div`
  font: 16px Arial, Helvetica, sans-serif;
  color: gray;
  height: 100px;
  width: 100px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  position: relative;
`
const PdfItemWrapper = styled.div`
  font: 16px Arial, Helvetica, sans-serif;
  color: gray;
  height:100px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 5px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 500px;
`

const DeleteIconWrapper = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  height: 28px;
`
const PreviewImage = styled.img`
  float: left;
  padding: 3px;
  width: 90px;
  height: 90px;
  margin-right: 5px;
`
const ContentWrapper = styled.div`

`
const Description = styled.span`

`
export default Wysiwyg;