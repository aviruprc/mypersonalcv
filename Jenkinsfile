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
        stage('Test') {
		steps{
      echo "Test"
      sh 'docker ps'
      sh 'if [ -d "mypersonalcv" ]; then rm -Rf mypersonalcv; fi'
      }
	  }

    stage('Building image') {
	    steps{
        script {
          dockerImage = docker.build registry + ":latest"
        }
      }
    }

    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }

    stage('Clean Workspace') {
      steps{
        script {
          sh 'docker rmi aviruprc/mypersonalcv:latest'
          }
        }
      }
    
    stage('Gcloud) {
      steps{
        script {
          sh 'pwd'
          sh 'docker run gcr.io/google.com/cloudsdktool/cloud-sdk:latest gcloud version'
          sh 'docker run -ti --name gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud auth login'
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
