import React from 'react';
import styled from 'styled-components';
import Wysiwyg from './wysiwyg.component';
// import MultiUploadTextArea from './multiupload_textarea.components'

const WysiwygMultiupload = () => {

	return (
		<WysiwygMultiuploadContainer>
		<Wysiwyg />
		
		</WysiwygMultiuploadContainer>
		)
}

const WysiwygMultiuploadContainer = styled.div`
	width: 600px;
	margin: 3rem auto;
	padding: 3px;
`

export default WysiwygMultiupload;