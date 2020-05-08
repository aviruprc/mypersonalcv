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
        sh 'pwd'
        sh 'docker run gcr.io/google.com/cloudsdktool/cloud-sdk:latest gcloud version'
        sh 'docker run gcr.io/google.com/cloudsdktool/cloud-sdk:266.0.0 gcloud auth activate-service-account --key-file avi-new-327a79e02adb.json'
        sh 'cat avi-new-327a79e02adb.json'
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
