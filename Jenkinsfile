pipeline {
  agent {
    docker {
      image 'node:10'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'echo me'
      }
    }
    stage('MergeToMaster') {
      when {
        not {
          branch 'master'
        }
      }
      steps {
        sh 'git status'
        sh 'git pull origin master'

      }
    }
  }
  environment {
    HOME = '.'
  }
}
