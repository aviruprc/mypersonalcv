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
        sh 'rm -r y'
        sh 'git clone https://github.com/aviruprc/mypersonalcv.git ./y'
	sh 'pwd'
	sh 'ls'
	sh 'cd y'
	sh 'chmod 777  deploy-info.yaml'  
	sh 'ls -l'
        script {
		
          step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
          }
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
