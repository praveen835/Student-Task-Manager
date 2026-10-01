from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#  Database URL sqlite means that we are using SQLite as our database.
# The "///./task_manager.db" part specifies the location of the database file.
#  In this case, it is located in the current directory and named "task_manager.db".

DATABASE_URL="sqlite:///./task_manager.db"


# Create a SQLAlchemy engine that will manage the connection to the database.

engine = create_engine(DATABASE_URL,connect_args={"check_same_thread": False})


# Create a sessionmaker factory that will generate new Session objects when called.

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for our ORM models to inherit from.
# This base class will contain the metadata and other information needed to map our
# Python classes to database tables.

Base = declarative_base()


# Define a function to get a database session.
# This function is a generator that yields a database session.

def get_db():
    """
    This function is a generator that yields a database session.
    It creates a new session, yields it to the caller, and then closes the session
    when the caller is done with it. This ensures that database connections are
    properly managed and closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

