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
        script {
          step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deploy-info.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
          }
        }
      }



    stage('SSH into Workspace') {
      steps{
        script {
              sh' git clone http://github.com/aviruprc/mypersonalcv'
              sh 'cd mypersonalcv'
        }
      }
    }

    stage('Clone Repo') {
      steps{
        script {
          sh 'gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project avi-test-275806'
          sh 'git clone http://github.com/aviruprc/mypersonalcv ./mycv'
          sh 'cd mycv/'
          sh 'helm install ./mycv --generate-name'
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
      sh 'docker rmi -f gcr.io/google.com/cloudsdktool/cloud-sdk:266.0.0'
		}
	}
}
