import React from 'react'

import { Editor } from '@tinymce/tinymce-react';

import $ from 'jquery';
// Load wiris formula render script.
const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
document.head.appendChild(jsDemoImagesTransform);
// This needs to be included before the '@wiris/mathtype-tinymce6' is loaded synchronously
window.$ = $;
window.tinymce = require('tinymce');  // Expose the TinyMCE to the window.
// Load wiris plugin synchronously.
require('@wiris/mathtype-tinymce6');

const CustomEditor = ({ editorRef,initialValue }) => {

    return (
        <>
            <Editor
                apiKey='90i3lvwfn05qjimz5kdy54s7zyr220ltk9gq1ymxsgau6dbe'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={initialValue || ""}
                id='custom-editor'
                init={{
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    extended_valid_elements: '*[.*]',
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'advcode', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'powerpaste', 'code'
                    ],
                    external_plugins: {
                        'tiny_mce_wiris': `${window.location.href}/node_modules/@wiris/mathtype-tinymce6/plugin.min.js`
                    },
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help |' + 'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry ',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    )
}

export default CustomEditor