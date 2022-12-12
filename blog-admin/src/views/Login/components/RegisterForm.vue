<script setup>
import { Form } from '@/components/Form'
import { reactive, ref, unref } from 'vue'
import { useForm } from '@/hooks/web/useForm'
import { ElButton, ElInput } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'

const emit = defineEmits(['to-login'])

const { register, elFormRef } = useForm()

const { required } = useValidator()

const schema = reactive([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'username',
    label: 'login.username',
    value: '',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: 'login.usernamePlaceholder'
    }
  },
  {
    field: 'password',
    label: 'login.password',
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      strength: true,
      placeholder: 'login.passwordPlaceholder'
    }
  },
  {
    field: 'check_password',
    label: 'login.checkPassword',
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      strength: true,
      placeholder: 'login.passwordPlaceholder'
    }
  },
  {
    field: 'code',
    label: 'login.code',
    colProps: {
      span: 24
    }
  },
  {
    field: 'register',
    colProps: {
      span: 24
    }
  }
])

const rules = {
  username: [required()],
  password: [required()],
  check_password: [required()],
  code: [required()]
}

const toLogin = () => {
  emit('to-login')
}

const loading = ref(false)

const loginRegister = async () => {
  const formRef = unref(elFormRef)
  formRef?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        toLogin()
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">{{ 'login.register' }}</h2>
    </template>

    <template #code="form">
      <div class="w-[100%] flex">
        <ElInput v-model="form['code']" :placeholder="'login.codePlaceholder'" />
      </div>
    </template>

    <template #register>
      <div class="w-[100%]">
        <ElButton type="primary" class="w-[100%]" :loading="loading" @click="loginRegister">
          {{ 'login.register' }}
        </ElButton>
      </div>
      <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toLogin">
          {{ 'login.hasUser' }}
        </ElButton>
      </div>
    </template>
  </Form>
</template>
