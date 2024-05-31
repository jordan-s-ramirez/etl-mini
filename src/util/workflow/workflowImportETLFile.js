import pako from 'pako';
import { handleETLFileImport } from '@/store/slices/workflowRedux';

export async function workflowImportETLFile(dispatch, handleLoadDatabase) {
  // Step 1: Create the file input element
  let fileInput = document.createElement('input');

  // Step 2: Set its attributes
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('id', 'myFileInput');
  // fileInput.setAttribute('name', 'fileInputName');

  // Optionally, you can set additional attributes like multiple, accept, etc.
  // fileInput.setAttribute('multiple', '');
  // fileInput.setAttribute('accept', 'image/*');

  // Step 3: Append it to the desired location in the DOM
  // For this example, we'll append it to the body, but you can append it to any other container
  document.body.appendChild(fileInput);

  // Optional: Add an event listener to handle file selection
  fileInput.addEventListener('change', function (event) {
    // Set Up File reader
    let fileReader = new FileReader()
    fileReader.onload = (e) => {
      // Parse Out Pako Encoding
      let decompressed = atob(e.target.result)
      decompressed = new Uint8Array(decompressed.split('').map(e => e.charCodeAt(0)));
      decompressed = pako.ungzip(decompressed, { to: 'string' });
      decompressed = JSON.parse(decompressed)

      // Update Redux States
      dispatch(handleETLFileImport(decompressed))

      // Load Databasese
      for (let node of decompressed.nodes) {
        if (node.nodeType === "dataInputNode") {
          handleLoadDatabase(node.nodeData.results[0].columns, node.nodeData.results[0].values, node.id)
        }
      }
    }

    // Read Files
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      fileReader.readAsText(files[i])
    }
  });

  fileInput.click()
  document.body.removeChild(fileInput)
}
