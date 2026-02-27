import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, onLogout }) => {
    const navigate = useNavigate();

    if (!user) {
        navigate('/account/login');
        return null;
    }

    return (
        <main className="layout">
            <section className="content">
                <h1>User Profile</h1>
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar-large">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
                        </div>
                        <div className="profile-main-info">
                            <h2>{user.name}</h2>
                            <p className="eyebrow">{user.isAdmin ? 'Administrator' : 'Customer'}</p>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="detail-item">
                            <label>Email Address</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="detail-item">
                            <label>Account ID</label>
                            <p className="order-id">{user._id}</p>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="btn-secondary" onClick={() => navigate('/cart')}>View Cart</button>
                        <button className="btn-primary" onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .profile-card {
          background: #f9fbff;
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid #e5edff;
          max-width: 600px;
        }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e5edff;
        }
        .profile-avatar-large {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          border: 3px solid #3b82f6;
        }
        .profile-avatar-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-details {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .detail-item label {
          font-weight: 700;
          color: #64748b;
          margin-bottom: 0.25rem;
          display: block;
        }
        .detail-item p {
          font-size: 1.1rem;
          margin: 0;
          color: #0f172a;
        }
        .profile-actions {
          display: flex;
          gap: 1rem;
        }
        .btn-primary {
          background: #ef4444;
          border-color: #ef4444;
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          cursor: pointer;
        }
        .btn-secondary {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          cursor: pointer;
        }
      `}} />
        </main>
    );
};

export default Profile;
