pipeline {
  agent none
  stages {
    stage('Build') {
  agent {
    docker {
      image 'node:10'
      args '-p 3000:3000 -u 0'
    }
  }
      steps {
        sh 'npm install'
        sh 'npm run test'
        sh 'npm run build:prod'
      }
    }
    stage('CopyToS3') {
      agent any
      steps {
        sh 'aws s3 cp dist/index.bundle.js s3://cohab/index.bundle.js'
        sh 'aws s3 cp dist/reset.bundle.js s3://cohab/reset.bundle.js'
      
      }
  environment {
    AWS_ACCESS_KEY_ID = credentials('AccessKeyID')
    AWS_SECRET_ACCESS_KEY = credentials('SecretAccessKey')
  }
      
    }
    stage('MergeToMaster') {
      when {
        not {
          branch 'master'
        }

      }
      steps {
        sh 'git config --local --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/*'
        sh 'echo $GIT_CREDENTIALS > "${HOME}/.git-credentials"'
        sh 'git config --global credential.helper "store --file ~/.git-credentials"'
        sh 'git fetch'
        sh 'git checkout $BRANCH_NAME'
        sh 'git pull origin $BRANCH_NAME'
        sh 'git checkout master'
        sh 'git pull origin master'
        sh 'git merge $BRANCH_NAME'
        sh 'git push origin master'
      }
    }
}
  environment {
    HOME = '.'
  }
}
