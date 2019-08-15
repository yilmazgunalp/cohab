DEPLOY_ENV = "place_holder"
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
        script {
          if (${branch_name} == 'prod') 
            DEPLOY_ENV = 'prod'
          } else {
            DEPLOY_ENV = 'beta'
            }
        sh "npm run build:${DEPLOY_ENV}"
      }
    }
    stage('Copy-to-S3') {
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
    }
  environment {
    HOME = '.'
  }
}
