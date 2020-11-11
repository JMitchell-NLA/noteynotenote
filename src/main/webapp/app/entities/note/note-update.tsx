import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/shared/reducers/user-management';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntity, updateEntity, createEntity, reset } from './note.reducer';
import { INote } from 'app/shared/model/note.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INoteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NoteUpdate = (props: INoteUpdateProps) => {
  const [idstag, setIdstag] = useState([]);
  const [assignedToId, setAssignedToId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { noteEntity, users, tags, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/note');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getTags();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...noteEntity,
        ...values,
        tags: mapIdList(values.tags),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="noteyboiApp.note.home.createOrEditLabel">
            <Translate contentKey="noteyboiApp.note.home.createOrEditLabel">Create or edit a Note</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : noteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="note-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="note-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contentLabel" for="note-content">
                  <Translate contentKey="noteyboiApp.note.content">Content</Translate>
                </Label>
                <AvField id="note-content" type="text" name="content" />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="note-title">
                  <Translate contentKey="noteyboiApp.note.title">Title</Translate>
                </Label>
                <AvField id="note-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="xposLabel" for="note-xpos">
                  <Translate contentKey="noteyboiApp.note.xpos">Xpos</Translate>
                </Label>
                <AvField id="note-xpos" type="string" className="form-control" name="xpos" />
              </AvGroup>
              <AvGroup>
                <Label id="yposLabel" for="note-ypos">
                  <Translate contentKey="noteyboiApp.note.ypos">Ypos</Translate>
                </Label>
                <AvField id="note-ypos" type="string" className="form-control" name="ypos" />
              </AvGroup>
              <AvGroup>
                <Label for="note-assignedTo">
                  <Translate contentKey="noteyboiApp.note.assignedTo">Assigned To</Translate>
                </Label>
                <AvInput id="note-assignedTo" type="select" className="form-control" name="assignedTo.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="note-tag">
                  <Translate contentKey="noteyboiApp.note.tag">Tag</Translate>
                </Label>
                <AvInput
                  id="note-tag"
                  type="select"
                  multiple
                  className="form-control"
                  name="tags"
                  value={noteEntity.tags && noteEntity.tags.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {tags
                    ? tags.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/note" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  tags: storeState.tag.entities,
  noteEntity: storeState.note.entity,
  loading: storeState.note.loading,
  updating: storeState.note.updating,
  updateSuccess: storeState.note.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getTags,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NoteUpdate);
