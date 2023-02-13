// Copyright 2017-2023 @polkadot/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';

import { Button, Input, Modal } from '@polkadot/react-components';
import { isNull } from '@polkadot/util';

import { ABI, InputName } from '../shared';
import store from '../store';
import { useTranslation } from '../translate';
import useAbi from '../useAbi';
import ValidateCode from './ValidateCode';

interface Props {
  onClose: () => void;
}

function Add ({ onClose }: Props): React.ReactElement {
  const { t } = useTranslation();
  const [codeHash, setCodeHash] = useState('');
  const [isCodeHashValid, setIsCodeHashValid] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const { abi, contractAbi, errorText, isAbiError, isAbiSupplied, isAbiValid, onChangeAbi, onRemoveAbi } = useAbi();

  const _onSave = useCallback(
    (): void => {
      if (!codeHash || !name) {
        return;
      }

      store.saveCode(codeHash, { abi, name, tags: [] });
      onClose();
    },
    [abi, codeHash, name, onClose]
  );

  const isNameValid = !isNull(name) && name.length > 0;
  const isValid = isCodeHashValid && isNameValid && isAbiSupplied && isAbiValid;

  return (
    <Modal
      header={t<string>('Add an existing code hash')}
      onClose={onClose}
    >
      <Modal.Content>
        <Input
          autoFocus
          isError={codeHash.length > 0 && !isCodeHashValid}
          label={t<string>('code hash')}
          onChange={setCodeHash}
          value={codeHash}
        />
        <ValidateCode
          codeHash={codeHash}
          onChange={setIsCodeHashValid}
        />
        <InputName
          isError={!isNameValid}
          onChange={setName}
          value={name || undefined}
        />
        <ABI
          contractAbi={contractAbi}
          errorText={errorText}
          isError={isAbiError || !isAbiError}
          isSupplied={isAbiSupplied}
          isValid={isAbiValid}
          onChange={onChangeAbi}
          onRemove={onRemoveAbi}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon='save'
          isDisabled={!isValid}
          label={t<string>('Save')}
          onClick={_onSave}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(Add);
