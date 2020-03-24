require('dotenv').config();
const shortid = require('shortid');

const { get, post } = require('./fetch');

(async () => {
  const id = shortid.generate().toLocaleLowerCase();
  await post('/apis/tekton.dev/v1alpha1/namespaces/default/pipelineruns',{
    "apiVersion": "tekton.dev/v1alpha1",
    "kind": "PipelineRun",
    "metadata": {
      "name": `ssr-demo-${id}`
    },
    "spec": {
      "pipelineRef": {
        "name": "build-and-deploy-pipeline"
      },
      "resources": [
        {
          "name": "ssr-runtime",
          "resourceRef": {
            "name": "ssr-runtime"
          }
        },
        {
          "name": "ssr-faas",
          "resourceRef": {
            "name": "ssr-faas"
          }
        }
      ],
      "params": [
        {
          "name": "imageTag",
          "value": id
        }
      ],
      "serviceAccountName": "tutorial-service"
    }
  });
  console.log(`ssr-demo-${id}`);
  const prs = await get('/apis/tekton.dev/v1alpha1/namespaces/default/pipelineruns');
  console.log(prs);
})();