pipeline {
  environment {
    registry = "aviruprc/mypersonalcv"
    registryCredential = 'DockerHub'
    dockerImage = ''
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
    
    stage('Installing Gcloud') {
      steps{
        script {
          sh 'docker run gcr.io/google.com/cloudsdktool/cloud-sdk:latest gcloud version'
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

    stage('Check GCloud') {
      steps{
        withEnv(['GCLOUD_PATH=/var/jenkins_home/google-cloud-sdk/bin']) {
                sh '$GCLOUD_PATH/gcloud --version' 
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
		}
	}
}
