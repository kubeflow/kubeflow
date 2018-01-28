# Use an official Python runtime as parent image
FROM python:2.7

# Build XGBoost
RUN git clone --recursive https://github.com/dmlc/xgboost
RUN cd xgboost; make -j4
