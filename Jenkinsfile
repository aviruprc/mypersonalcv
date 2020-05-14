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
  	stage('Kubernetes Deployment') {
      agent {
        label 'java-jenkins-slave'
      }
      steps{
	git credentialsId: 'GitHub', url: 'https://github.com/aviruprc/secrets'
        sh 'gcloud auth activate-service-account --key-file=avi-returns-aa5d13550a37.json'
	sh 'gcloud container clusters get-credentials cluster-1 --zone us-central1-a --project avi-returns'
	git 'https://github.com/aviruprc/mypersonalcv'
        sh 'helm install ./cv --generate-name'
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
