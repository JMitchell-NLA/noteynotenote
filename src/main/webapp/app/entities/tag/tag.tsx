import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tag.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITagProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Tag = (props: ITagProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tagList, match, loading } = props;
  return (
    <div>
      <h2 id="tag-heading">
        <Translate contentKey="noteyboiApp.tag.home.title">Tags</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="noteyboiApp.tag.home.createLabel">Create new Tag</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tagList && tagList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="noteyboiApp.tag.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="noteyboiApp.tag.assignedTo">Assigned To</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tagList.map((tag, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tag.id}`} color="link" size="sm">
                      {tag.id}
                    </Button>
                  </td>
                  <td>{tag.name}</td>
                  <td>{tag.assignedTo ? tag.assignedTo.login : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tag.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tag.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tag.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="noteyboiApp.tag.home.notFound">No Tags found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tag }: IRootState) => ({
  tagList: tag.entities,
  loading: tag.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
