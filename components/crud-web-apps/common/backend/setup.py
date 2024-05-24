import setuptools

REQUIRES = [
    "Flask >= 1.1.1",
    "Flask-API >= 2.0",
    "kubernetes == 22.6.0",
    "requests >= 2.22.0",
    "urllib3 >= 1.25.7",
    "Werkzeug >= 0.16.0",
    "Flask-Cors >= 3.0.8",
    "gevent",
]

setuptools.setup(
    name="kubeflow",
    version="1.1",
    author="kubeflow-dev-team",
    description="A package with a base Flask CRUD backend common code",
    packages=setuptools.find_packages(),
    install_requires=REQUIRES,
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: Apache Software License",
        "Topic :: Software Development",
        "Topic :: Software Development :: Libraries",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    python_requires=">=3.6",
)
