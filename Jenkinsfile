pipeline {
  environment {
    registry = "aviruprc/mypersonalcv"
    registryCredential = 'DockerHub'
    dockerImage = ''
  }
  agent any
  stages {

    stage('Installing Gcloud') {
      steps{
        script {
          sh 'rm -r mypersonalcv'
          sh 'git clone http://github.com/aviruprc/mypersonalcv'
          sh 'cd mypersonalcv'
          sh 'docker run gcr.io/google.com/cloudsdktool/cloud-sdk:266.0.0 gcloud auth activate-service-account --key-file avi-new-327a79e02adb.json'
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
