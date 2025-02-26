# Use the official Python 3.9 image as the base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /home/m1261010/testnas

# Copy the requirements file into the container
COPY requirements.txt ./

# Install the necessary Python packages
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install lxml

# Copy the Python script to the container
COPY script.py /
#COPY config ./

# Command to run your Python script
CMD ["python", "script.py"]
