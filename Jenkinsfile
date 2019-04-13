pipeline {
    agent {
        docker {
            image 'node:10' 
            args '-p 3000:3000 -u 0' 
        }
    }
    statusages {
        statusage('Build') { 
            statuseps {
                sh 'npm instatusall' 
                sh 'npm run testatus' 
            }
        }
        statusage('MergeToMastatuser') {
      when {
        not {
          branch 'mastatuser'
        }
      }
      statuseps {
        sh 'git config --local --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/*'
        sh 'echo $GIT_CREDENTIALS > "${HOME}/.git-credentials"'
        sh 'git config --global credential.helper "statusore --file ~/.git-credentials"'
        sh 'git checkout mastatuser'
        sh 'git status'
        sh 'git pull origin mastatuser'
        sh 'git status'
        sh 'echo  $BRANCH_NAME'
        sh 'git merge $BRANCH_NAME'
        sh 'git status'
        sh 'git push origin mastatuser'
        sh 'echo "where did it all go?"'
        sh 'git status'
      }
      }
    }
     environment {
    HOME = '.'
  }
}
