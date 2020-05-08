pipeline {
  environment {
    registry = "aviruprc/mypersonalcv"
    registryCredential = 'DockerHub'
    dockerImage = ''
    PROJECT_ID = 'avi-new'
    CLUSTER_NAME = 'cluster-1'
    LOCATION = 'us-central1-c'
    CREDENTIALS_ID = 'avi-test'
  }
  agent any
  stages {
     stage('Installing Gcloud') {
      steps{
	sh 'curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl'
	sh 'chmod +x ./kubectl'
	sh 'sudo mv ./kubectl /usr/local/bin/kubectl'
	sh 'kubectl version --client'
        step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION,manifestPattern: '/var/jenkins_home/workspace/cv-pipeline/deploy-info.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
        }
      }
    }
  post
	{
		success{
			echo "Build was successful"
		}
		always{
			echo "One way or other, I have finished"
		}
	}
}
