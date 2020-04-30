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
      sh 'docker'
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


