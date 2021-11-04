#pylint: skip-file
from flask_cors import CORS
import requests
import pytest
from flask import Flask
import test_config

def test_submit_project():
    mock_user = {'name': 'test_project',
                 'description': 'This is a test for project1',
                 'imageUrl': 'https://irp-cdn.multiscreensite.com/599c5dd6/dms3rep/multi/Lessons+learned+from+highly+successful+software+engineers.+%282%29.gif',
                 'tags': 'first tag',
                 'email': 'test_project@gmail.com'}

    submit_project_url = f'{test_config.test_url}/addProduct'

    response = requests.post(submit_project_url, data=mock_user)
    assert response.status_code == 200

def test_submit_project_missing_name():
    mock_user = {'name': '',
                 'description': 'This is a test for project1',
                 'imageUrl': 'https://irp-cdn.multiscreensite.com/599c5dd6/dms3rep/multi/Lessons+learned+from+highly+successful+software+engineers.+%282%29.gif',
                 'tags': 'first tag',
                 'email': 'test_project@gmail.com'}

    submit_project_url = f'{test_config.test_url}/addProduct'

    response = requests.post(submit_project_url, data=mock_user)
    assert response.status_code == 403

def test_submit_project_missing_description():
    mock_user = {'name': 'test_project',
                 'description': '',
                 'imageUrl': 'https://irp-cdn.multiscreensite.com/599c5dd6/dms3rep/multi/Lessons+learned+from+highly+successful+software+engineers.+%282%29.gif',
                 'tags': 'first tag',
                 'email': 'test_project@gmail.com'}

    submit_project_url = f'{test_config.test_url}/addProduct'

    response = requests.post(submit_project_url, data=mock_user)
    assert response.status_code == 403

def test_submit_project_missing_imageUrl():
    mock_user = {'name': 'test_project',
                 'description': 'This is a test for project1',
                 'imageUrl': '',
                 'tags': 'first tag',
                 'email': 'test_project@gmail.com'}

    submit_project_url = f'{test_config.test_url}/addProduct'

    response = requests.post(submit_project_url, data=mock_user)
    assert response.status_code == 403

def test_submit_project_missing_tags():
    mock_user = {'name': 'test_project',
                 'description': 'This is a test for project1',
                 'imageUrl': 'https://irp-cdn.multiscreensite.com/599c5dd6/dms3rep/multi/Lessons+learned+from+highly+successful+software+engineers.+%282%29.gif',
                 'tags': '',
                 'email': 'test_project@gmail.com'}

    submit_project_url = f'{test_config.test_url}/addProduct'

    response = requests.post(submit_project_url, data=mock_user)
    assert response.status_code == 403

def test_submit_project_missing_email():
    mock_user = {'name': 'test_project',
                 'description': 'This is a test for project1',
                 'imageUrl': 'https://irp-cdn.multiscreensite.com/599c5dd6/dms3rep/multi/Lessons+learned+from+highly+successful+software+engineers.+%282%29.gif',
                 'tags': 'first tag',
                 'email': ''}

    submit_project_url = f'{test_config.test_url}/addProduct'

    response = requests.post(submit_project_url, data=mock_user)
    assert response.status_code == 403
