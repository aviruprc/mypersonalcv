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
      sh 'rm -r mypersonalcv'
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
		}
	}
}
